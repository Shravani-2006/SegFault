import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Modal, TextInput, Animated, Easing } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // Assuming Expo environment for icons

// Component for the navigation items at the bottom of the screen.
const NavItem = ({ icon, text, onPress, isActive }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.navItemContainer,
      isActive ? styles.navItemActive : styles.navItemInactive,
    ]}
  >
    <FontAwesome5 name={icon} size={24} color={isActive ? 'white' : 'gray'} />
    <Text style={[styles.navItemText, isActive ? styles.navItemTextActive : styles.navItemTextInactive]}>
      {text}
    </Text>
  </TouchableOpacity>
);

// Main App Component
const App = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [language, setLanguage] = useState('en');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [assistantStep, setAssistantStep] = useState(0);
  const [highlightedBlockId, setHighlightedBlockId] = useState(null);

  // Dynamic data that will be translated
  const tasks = [
    { id: 1, text: 'Check soil moisture in Field A', completed: false },
    { id: 2, text: 'Apply fertilizer to corn crops', completed: false },
    { id: 3, text: 'Inspect irrigation system for leaks', completed: false },
  ];
  const alerts = [
    { id: 1, text: 'Low soil moisture in Field B', level: 'High' },
    { id: 2, text: 'Pest infestation detected on tomato plants', level: 'Medium' },
  ];
  const crops = [
    { id: 1, name: 'Corn', plantingDate: '2025-03-15', status: 'Growing' },
    { id: 2, name: 'Soybeans', plantingDate: '2025-04-20', status: 'Flowering' },
    { id: 3, name: 'Wheat', plantingDate: '2025-10-01', status: 'Harvesting' },
  ];
  const calendarEvents = [
    { date: '2025-09-25', event: 'Harvest Corn', type: 'harvest' },
    { date: '2025-10-01', event: 'Plant Wheat', type: 'planting' },
    { date: '2025-10-10', event: 'Soil testing', type: 'maintenance' },
  ];

  const [currentDate, setCurrentDate] = useState(new Date());

  const toggleTask = (id) => {
    // Logic for toggling a task
  };

  const clearAlerts = () => {
    // Logic for clearing alerts
  };

  // Translations object for English and Malayalam
  const translations = {
    en: {
      dashboard: "Home", manageCrops: "Crops", calendar: "Calendar", weather: "Weather", dailyTasks: "Daily Tasks", chatbot: "AI Chatbot", alerts: "Alerts", recommendations: "AI Recommendations", marketPrice: "Market Price", low: "Low", high: "High", medium: "Medium", clearAll: "Clear All", placeholder: "Type a message...", send: "Send", today: "Today", crops: "Crops", plantingDate: "Planting Date", status: "Status", events: "Events", welcome: "Welcome back, Farmer!", next: "Next", close: "Close", sun: "Sun", mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu", fri: "Fri", sat: "Sat", noAlerts: "No new alerts.", chatWelcome: "Hello! How can I help with your farming today?", recommendationText: "Based on current weather and soil data, we recommend increasing irrigation by 15% for your corn fields over the next three days.", weatherDescription: "Sunny with a slight breeze", monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      task1: 'Check soil moisture in Field A',
      task2: 'Apply fertilizer to corn crops',
      task3: 'Inspect irrigation system for leaks',
      alert1: 'Low soil moisture in Field B',
      alert2: 'Pest infestation detected on tomato plants',
      crop1: 'Corn',
      crop2: 'Soybeans',
      crop3: 'Wheat',
      status1: 'Growing',
      status2: 'Flowering',
      status3: 'Harvesting',
      event1: 'Harvest Corn',
      event2: 'Plant Wheat',
      event3: 'Soil testing',
      tour: [
        { text: "Hi there! I'm your AI Farming Assistant. I can help you manage your farm. Let me give you a quick tour.", title: "Welcome!", highlightId: null },
        { text: "This is your daily tasks list. You can check off tasks as you complete them.", title: "Daily Tasks", highlightId: "daily-tasks" },
        { text: "This is the AI Chatbot. You can ask me questions about your crops or get personalized advice.", title: "AI Chatbot", highlightId: "chatbot" },
        { text: "This is where you'll find important alerts about your farm, like low soil moisture or pest warnings.", title: "Alerts", highlightId: "alerts" },
        { text: "These are AI-powered recommendations tailored to your specific farm data. I will give you smart tips on what to do next.", title: "AI Recommendations", highlightId: "recommendations" },
        { text: "Check here for real-time market prices of key crops to help you make informed decisions.", title: "Market Price", highlightId: "market-price" },
        { text: "That's the end of the tour! I'm here to help whenever you need me. Just tap my icon again.", title: "Tour Complete", highlightId: null },
      ]
    },
    ml: {
      dashboard: "ഹോം", manageCrops: "വിളകൾ", calendar: "കലണ്ടർ", weather: "കാലാവസ്ഥ", dailyTasks: "ദൈനംദിന ടാസ്ക്കുകൾ", chatbot: "AI ചാറ്റ്ബോട്ട്", alerts: "അലേർട്ടുകൾ", recommendations: "AI ശുപാർശകൾ", marketPrice: "മാർക്കറ്റ് വില", low: "കുറഞ്ഞത്", high: "കൂടിയത്", medium: "മിതമായത്", clearAll: "എല്ലാം മായ്ക്കുക", placeholder: "ഒരു സന്ദേശം ടൈപ്പ് ചെയ്യുക...", send: "അയയ്ക്കുക", today: "ഇന്ന്", crops: "വിളകൾ", plantingDate: "നടീൽ തീയതി", status: "നില", events: "ഇവന്റുകൾ", welcome: "തിരികെ സ്വാഗതം, കർഷകനേ!", next: "അടുത്തത്", close: "അടയ്ക്കുക", sun: "ഞായർ", mon: "തിങ്കൾ", tue: "ചൊവ്വ", wed: "ബുധൻ", thu: "വ്യാഴം", fri: "വെള്ളി", sat: "ശനി", noAlerts: "പുതിയ അലേർട്ടുകൾ ഇല്ല.", chatWelcome: "ഹലോ! ഇന്ന് നിങ്ങളുടെ കൃഷിയെ എങ്ങനെ സഹായിക്കാനാകും?", recommendationText: "നിലവിലെ കാലാവസ്ഥയും മണ്ണിന്റെ വിവരങ്ങളും അനുസരിച്ച്, അടുത്ത മൂന്ന് ദിവസത്തേക്ക് നിങ്ങളുടെ ചോളം പാടങ്ങൾക്ക് 15% കൂടുതൽ നനയ്ക്കാൻ ഞങ്ങൾ ശുപാർശ ചെയ്യുന്നു.", weatherDescription: "സൂര്യപ്രകാശവും നേരിയ കാറ്റും", monthNames: ["ജനുവരി", "ഫെബ്രുവരി", "മാർച്ച്", "ഏപ്രിൽ", "മെയ്", "ജൂൺ", "ജൂലൈ", "ഓഗസ്റ്റ്", "സെപ്റ്റംബർ", "ഒക്ടോബർ", "നവംബർ", "ഡിസംബർ"],
      task1: 'പാടം എയിലെ മണ്ണിന്റെ ഈർപ്പം പരിശോധിക്കുക',
      task2: 'ചോള വിളകൾക്ക് വളം പ്രയോഗിക്കുക',
      task3: 'ജലസേചന സംവിധാനത്തിൽ ചോർച്ചയുണ്ടോയെന്ന് പരിശോധിക്കുക',
      alert1: 'പാടം ബിയിൽ മണ്ണിന്റെ ഈർപ്പം കുറവാണ്',
      alert2: 'തക്കാളി ചെടികളിൽ കീടബാധ കണ്ടെത്തി',
      crop1: 'ചോളം',
      crop2: 'സോയാബീൻസ്',
      crop3: 'ഗോതമ്പ്',
      status1: 'വളരുന്നു',
      status2: 'പൂവിടുന്നു',
      status3: 'വിളവെടുക്കുന്നു',
      event1: 'ചോളം വിളവെടുപ്പ്',
      event2: 'ഗോതമ്പ് നടുക',
      event3: 'മണ്ണ് പരിശോധന',
      tour: [
        { text: "ഹായ്! ഞാൻ നിങ്ങളുടെ AI ഫാമിംഗ് അസിസ്റ്റന്റാണ്. നിങ്ങളുടെ കൃഷിയിടം നിയന്ത്രിക്കാൻ എന്നെ സഹായിക്കാനാകും. ഒരു ചെറിയ ടൂർ തരാം.", title: "സ്വാഗതം!", highlightId: null },
        { text: "ഇതാണ് നിങ്ങളുടെ ദൈനംദിന ടാസ്ക്കുകളുടെ ലിസ്റ്റ്. പൂർത്തിയാകുന്ന ടാസ്ക്കുകൾ നിങ്ങൾക്ക് ഇവിടെ ടിക്ക് ചെയ്യാം.", title: "ദൈനംദിന ടാസ്ക്കുകൾ", highlightId: "daily-tasks" },
        { text: "ഇതാണ് AI ചാറ്റ്ബോട്ട്. നിങ്ങളുടെ വിളകളെക്കുറിച്ച് എന്നോട് ചോദ്യങ്ങൾ ചോദിക്കാം അല്ലെങ്കിൽ വ്യക്തിപരമായ ഉപദേശം നേടാം. നിങ്ങൾക്ക് ടൈപ്പ് ചെയ്യാനോ, ശബ്ദം ഉപയോഗിക്കാനോ, അല്ലെങ്കിൽ ഒരു ചിത്രം അപ്‌ലോഡ് ചെയ്യാനോ കഴിയും!", title: "AI ചാറ്റ്ബോട്ട്", highlightId: "chatbot" },
        { text: "നിങ്ങളുടെ കൃഷിയിടത്തെക്കുറിച്ചുള്ള പ്രധാനപ്പെട്ട അലേർട്ടുകൾ ഇവിടെ കാണാം, ഉദാഹരണത്തിന് കുറഞ്ഞ മണ്ണിന്റെ ഈർപ്പം അല്ലെങ്കിൽ കീടങ്ങളുടെ മുന്നറിയിപ്പുകൾ.", title: "അലേർട്ടുകൾ", highlightId: "alerts" },
        { text: "ഇത് നിങ്ങളുടെ കൃഷിയിടത്തിലെ വിവരങ്ങൾക്കനുസരിച്ച് AI നൽകുന്ന ശുപാർശകളാണ്. അടുത്തതായി എന്ത് ചെയ്യണം എന്നതിനെക്കുറിച്ച് ഞാൻ നിങ്ങൾക്ക് മികച്ച നുറുങ്ങുകൾ നൽകും.", title: "AI ശുപാർശകൾ", highlightId: "recommendations" },
        { text: "കൃത്യമായ തീരുമാനങ്ങൾ എടുക്കാൻ പ്രധാന വിളകളുടെ തത്സമയ മാർക്കറ്റ് വിലകൾ ഇവിടെ പരിശോധിക്കുക.", title: "മാർക്കറ്റ് വില", highlightId: "market-price" },
        { text: "ടൂർ ഇവിടെ അവസാനിക്കുന്നു! നിങ്ങൾക്ക് ആവശ്യമുള്ളപ്പോൾ ഞാൻ ഇവിടെ ഉണ്ടാകും. എന്റെ ഐക്കണിൽ വീണ്ടും ടാപ്പുചെയ്യുക.", title: "ടൂർ പൂർത്തിയായി", highlightId: null },
      ]
    }
  };

  const t = translations[language];

  // Helper function to translate hardcoded text strings
  const translateText = (text) => {
    const translationMap = {
      'Check soil moisture in Field A': t.task1,
      'Apply fertilizer to corn crops': t.task2,
      'Inspect irrigation system for leaks': t.task3,
      'Low soil moisture in Field B': t.alert1,
      'Pest infestation detected on tomato plants': t.alert2,
      'Corn': t.crop1,
      'Soybeans': t.crop2,
      'Wheat': t.crop3,
      'Growing': t.status1,
      'Flowering': t.status2,
      'Harvesting': t.status3,
      'Harvest Corn': t.event1,
      'Plant Wheat': t.event2,
      'Soil testing': t.event3,
    };
    return translationMap[text] || text;
  };

  const currentStep = t.tour[assistantStep];

  // Animation for the highlighting effect
  const pulseAnim = useRef(new Animated.Value(0)).current;

  const startPulseAnimation = () => {
    pulseAnim.setValue(0);
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      {
        iterations: -1,
      }
    ).start();
  };

  useEffect(() => {
    if (highlightedBlockId) {
      startPulseAnimation();
    } else {
      pulseAnim.stopAnimation();
      pulseAnim.setValue(0);
    }
  }, [highlightedBlockId]);

  const startTour = () => {
    setActivePage('dashboard');
    setIsAssistantOpen(true);
    setAssistantStep(0);
    setHighlightedBlockId(t.tour[0].highlightId);
  };

  const handleNextStep = () => {
    const nextStep = assistantStep + 1;
    if (nextStep < t.tour.length) {
      setAssistantStep(nextStep);
      setHighlightedBlockId(t.tour[nextStep].highlightId);
    } else {
      setIsAssistantOpen(false);
      setAssistantStep(0);
      setHighlightedBlockId(null);
    }
  };

  // Reusable Card Component, which also handles the pulsing highlight effect
  const Card = ({ title, id, children }) => {
    const isHighlighted = highlightedBlockId === id;
    const pulseScale = pulseAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.05],
    });
    const pulseOpacity = pulseAnim.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.8, 1, 0.8],
    });

    return (
      <Animated.View style={[styles.cardContainer, isHighlighted && { transform: [{ scale: pulseScale }], opacity: pulseOpacity }]}>
        <Text style={styles.cardTitle}>{title}</Text>
        <View style={styles.cardContent}>
          {children}
        </View>
      </Animated.View>
    );
  };

  // Renders the correct screen based on the activePage state.
  const renderPage = () => {
    switch (activePage) {
      case 'manage-crops':
        return (
          <View style={styles.pageContainer}>
            <Text style={styles.pageTitle}>{t.manageCrops}</Text>
            {crops.map(crop => (
              <Card key={crop.id} title={translateText(crop.name)}>
                <View style={styles.cropItem}>
                  <View style={styles.cropImagePlaceholder} />
                  <View>
                    <Text style={styles.cropText}>{t.plantingDate}: {crop.plantingDate}</Text>
                    <Text style={styles.cropText}>{t.status}: {translateText(crop.status)}</Text>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        );
      case 'calendar':
        const daysOfWeek = [t.sun, t.mon, t.tue, t.wed, t.thu, t.fri, t.sat];
        const monthNames = t.monthNames;
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const days = [];

        for (let i = 0; i < firstDayOfMonth; i++) {
          days.push(<View key={`empty-${i}`} style={styles.calendarDayEmpty} />);
        }
        for (let i = 1; i <= daysInMonth; i++) {
          const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
          const hasEvent = calendarEvents.some(event => event.date === dateString);
          days.push(
            <View key={i} style={styles.calendarDay}>
              <Text style={styles.calendarDayText}>{i}</Text>
              {hasEvent && <View style={styles.calendarEventDot} />}
            </View>
          );
        }

        return (
          <View style={styles.pageContainer}>
            <Text style={styles.pageTitle}>{t.calendar}</Text>
            <Card title={`${monthNames[month]} ${year}`}>
              <View style={styles.calendarHeader}>
                <TouchableOpacity onPress={() => setCurrentDate(new Date(year, month - 1, 1))}>
                  <Text style={styles.calendarNavText}>&lt;</Text>
                </TouchableOpacity>
                <Text style={styles.calendarMonthText}>{monthNames[month]} {year}</Text>
                <TouchableOpacity onPress={() => setCurrentDate(new Date(year, month + 1, 1))}>
                  <Text style={styles.calendarNavText}>&gt;</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.calendarWeekDays}>
                {daysOfWeek.map(day => <Text key={day} style={styles.calendarWeekDayText}>{day}</Text>)}
              </View>
              <View style={styles.calendarGrid}>
                {days}
              </View>
            </Card>
            <Card title={t.events}>
              {calendarEvents.map((event, index) => (
                <View key={index} style={styles.eventItem}>
                  <Text style={styles.eventIcon}>
                    {event.type === 'planting' ? '🌱' : event.type === 'harvest' ? '🌾' : '🧪'}
                  </Text>
                  <View>
                    <Text style={styles.eventText}>{translateText(event.event)}</Text>
                    <Text style={styles.eventDate}>{event.date}</Text>
                  </View>
                </View>
              ))}
            </Card>
          </View>
        );
      case 'dashboard':
      default:
        return (
          <View style={styles.pageContainer}>
            <Text style={styles.pageTitle}>{t.welcome}</Text>
            {/* Alerts Card */}
            <Card title={t.alerts} id="alerts">
              {alerts.length > 0 ? (
                alerts.map(alert => (
                  <View key={alert.id} style={styles.alertItem}>
                    <View style={[styles.alertDot, { backgroundColor: alert.level === 'High' ? 'red' : 'orange' }]} />
                    <Text style={styles.alertText}>{translateText(alert.text)}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noAlertsText}>{t.noAlerts}</Text>
              )}
              {alerts.length > 0 && (
                <TouchableOpacity onPress={clearAlerts} style={styles.clearAllButton}>
                  <Text style={styles.clearAllButtonText}>{t.clearAll}</Text>
                </TouchableOpacity>
              )}
            </Card>

            {/* Daily Tasks Card */}
            <Card title={t.dailyTasks} id="daily-tasks">
              {tasks.map(task => (
                <TouchableOpacity key={task.id} onPress={() => toggleTask(task.id)} style={styles.taskItem}>
                  <View style={[styles.taskCheckbox, task.completed && styles.taskCheckboxCompleted]} />
                  <Text style={[styles.taskText, task.completed && styles.taskTextCompleted]}>
                    {translateText(task.text)}
                  </Text>
                </TouchableOpacity>
              ))}
            </Card>

            {/* Chatbot Card */}
            <Card title={t.chatbot} id="chatbot">
              <View style={styles.chatbotContainer}>
                <View style={styles.chatbotMessages}>
                  <View style={styles.botMessage}>
                    <Text style={styles.botIcon}>🤖</Text>
                    <View style={styles.botMessageBubble}>
                      <Text style={styles.botMessageText}>{t.chatWelcome}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.chatInputContainer}>
                  <TextInput
                    style={styles.chatInput}
                    placeholder={t.placeholder}
                    placeholderTextColor="gray"
                  />
                  <TouchableOpacity style={styles.sendButton}>
                    <FontAwesome5 name="paper-plane" size={18} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </Card>

            {/* AI Recommendations Card */}
            <Card title={t.recommendations} id="recommendations">
              <Text style={styles.recommendationText}>{t.recommendationText}</Text>
            </Card>

            {/* Market Price Card */}
            <Card title={t.marketPrice} id="market-price">
              <View style={styles.marketPriceItem}>
                <Text style={styles.marketPriceLabel}>{t.crop3}:</Text>
                <Text style={styles.marketPriceValue}>$7.20 / bushel</Text>
              </View>
              <View style={styles.marketPriceItem}>
                <Text style={styles.marketPriceLabel}>{t.crop1}:</Text>
                <Text style={styles.marketPriceValue}>$5.85 / bushel</Text>
              </View>
              <View style={styles.marketPriceItem}>
                <Text style={styles.marketPriceLabel}>{t.crop2}:</Text>
                <Text style={styles.marketPriceValue}>$13.50 / bushel</Text>
              </View>
            </Card>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTitleContainer}>
            <FontAwesome5 name="tractor" size={24} color="white" />
            <Text style={styles.headerTitle}>Krishi Sakhi</Text>
          </View>
          <View style={styles.languageSwitcher}>
            <TouchableOpacity onPress={() => setLanguage(language === 'en' ? 'ml' : 'en')}>
              <Text style={styles.languageText}>{language === 'en' ? 'English' : 'മലയാളം'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Main content area */}
        <ScrollView style={styles.mainContent}>
          {renderPage()}
        </ScrollView>

        {/* Footer Navigation */}
        <View style={styles.footer}>
          <NavItem
            icon="home"
            text={t.dashboard}
            onPress={() => setActivePage('dashboard')}
            isActive={activePage === 'dashboard'}
          />
          <NavItem
            icon="seedling"
            text={t.manageCrops}
            onPress={() => setActivePage('manage-crops')}
            isActive={activePage === 'manage-crops'}
          />
          <NavItem
            icon="calendar-alt"
            text={t.calendar}
            onPress={() => setActivePage('calendar')}
            isActive={activePage === 'calendar'}
          />
        </View>

        {/* Floating AI Assistant button */}
        <TouchableOpacity
          onPress={startTour}
          style={styles.aiButton}
        >
          <FontAwesome5 name="robot" size={30} color="white" />
        </TouchableOpacity>

        {/* AI Assistant Modal */}
        <Modal
          visible={isAssistantOpen}
          transparent={true}
          animationType="fade"
          onRequestClose={() => { setIsAssistantOpen(false); setHighlightedBlockId(null); }}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.assistantBubble}>
              <Text style={styles.assistantTitle}>{currentStep.title}</Text>
              <Text style={styles.assistantText}>{currentStep.text}</Text>
              <View style={styles.assistantButtons}>
                <TouchableOpacity
                  onPress={() => { setIsAssistantOpen(false); setHighlightedBlockId(null); }}
                  style={styles.modalButton}
                >
                  <Text style={styles.modalButtonText}>{t.close}</Text>
                </TouchableOpacity>
                {assistantStep < t.tour.length - 1 && (
                  <TouchableOpacity
                    onPress={handleNextStep}
                    style={[styles.modalButton, styles.modalNextButton]}
                  >
                    <Text style={[styles.modalButtonText, styles.modalNextButtonText]}>{t.next}</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

// Main stylesheet for the application
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0fdf4',
  },
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
  },
  header: {
    padding: 16,
    backgroundColor: '#047857',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
  },
  languageSwitcher: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  languageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#047857',
  },
  mainContent: {
    flex: 1,
    padding: 16,
  },
  pageContainer: {
    paddingBottom: 24,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#047857',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  // Reusable Card styles
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a4731',
    marginBottom: 16,
  },
  cardContent: {
    backgroundColor: '#f0fdf4',
    borderRadius: 8,
    padding: 16,
  },
  // Alerts Card styles
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 8,
  },
  alertDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  alertText: {
    color: '#333',
  },
  noAlertsText: {
    color: 'gray',
    textAlign: 'center',
  },
  clearAllButton: {
    marginTop: 16,
    backgroundColor: '#ef4444',
    borderRadius: 8,
    paddingVertical: 12,
  },
  clearAllButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  // Daily Tasks Card styles
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 8,
  },
  taskCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#047857',
    marginRight: 12,
  },
  taskCheckboxCompleted: {
    backgroundColor: '#047857',
  },
  taskText: {
    color: '#333',
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  // Chatbot Card styles
  chatbotContainer: {
    height: 200,
  },
  chatbotMessages: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 16,
  },
  botMessage: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  botIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  botMessageBubble: {
    backgroundColor: '#e5e7eb',
    padding: 12,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    maxWidth: '85%',
  },
  botMessageText: {
    fontSize: 14,
    color: '#374151',
  },
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatInput: {
    flex: 1,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  sendButton: {
    backgroundColor: '#047857',
    borderRadius: 25,
    padding: 12,
    marginLeft: 8,
  },
  // Recommendations Card styles
  recommendationText: {
    color: '#333',
  },
  // Crops Page styles
  cropItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
  },
  cropImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#8BC34A',
    marginRight: 16,
  },
  cropText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4b5563',
  },
  // Calendar Page styles
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarNavText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  calendarMonthText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  calendarWeekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  calendarWeekDayText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'gray',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
    position: 'relative',
  },
  calendarDayText: {
    fontSize: 14,
  },
  calendarEventDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#059669',
    position: 'absolute',
    bottom: 4,
  },
  calendarDayEmpty: {
    width: '14.28%',
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    marginBottom: 8,
  },
  eventIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  eventText: {
    fontSize: 16,
    fontWeight: '600',
  },
  eventDate: {
    fontSize: 12,
    color: 'gray',
  },
  // Market Price Card styles
  marketPriceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 8,
  },
  marketPriceLabel: {
    fontWeight: 'bold',
    color: '#4b5563',
  },
  marketPriceValue: {
    fontWeight: 'bold',
    color: '#059669',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingVertical: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
  },
  navItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 12,
  },
  navItemText: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: 'bold',
  },
  navItemActive: {
    backgroundColor: '#047857',
  },
  navItemInactive: {
    backgroundColor: 'transparent',
  },
  navItemTextActive: {
    color: 'white',
  },
  navItemTextInactive: {
    color: 'gray',
  },
  // Floating AI Assistant button
  aiButton: {
    position: 'absolute',
    bottom: 100,
    right: 24,
    backgroundColor: '#22c55e',
    borderRadius: 50,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  // AI Assistant Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  assistantBubble: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  assistantTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a4731',
    marginBottom: 8,
    textAlign: 'center',
  },
  assistantText: {
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  assistantButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#ccc',
  },
  modalNextButton: {
    backgroundColor: '#22c55e',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;
