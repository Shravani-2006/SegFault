import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput, Picker } from 'react-native';

const App = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [language, setLanguage] = useState('en');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [assistantStep, setAssistantStep] = useState(0);
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Check soil moisture in Field A', completed: false },
    { id: 2, text: 'Apply fertilizer to corn crops', completed: false },
    { id: 3, text: 'Inspect irrigation system for leaks', completed: false },
  ]);
  const [alerts, setAlerts] = useState([
    { id: 1, text: 'Low soil moisture in Field B', level: 'High' },
    { id: 2, text: 'Pest infestation detected on tomato plants', level: 'Medium' },
  ]);
  const [crops, setCrops] = useState([
    { id: 1, name: 'Corn', plantingDate: '2025-03-15', status: 'Growing', imageUrl: 'https://placehold.co/150x150/8BC34A/FFFFFF/png?text=Corn' },
    { id: 2, name: 'Soybeans', plantingDate: '2025-04-20', status: 'Flowering', imageUrl: 'https://placehold.co/150x150/FFEB3B/000000/png?text=Soybeans' },
    { id: 3, name: 'Wheat', plantingDate: '2025-10-01', status: 'Harvesting', imageUrl: 'https://placehold.co/150x150/FF9800/FFFFFF/png?text=Wheat' },
  ]);
  const [calendarEvents, setCalendarEvents] = useState([
    { date: '2025-09-25', event: 'Harvest Corn', type: 'harvest' },
    { date: '2025-10-01', event: 'Plant Wheat', type: 'planting' },
    { date: '2025-10-10', event: 'Soil testing', type: 'maintenance' },
  ]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const clearAlerts = () => {
    setAlerts([]);
  };

  const startTour = () => {
    setIsAssistantOpen(true);
    setAssistantStep(0);
  };

  const tourSteps = [
    {
      text: language === 'en' ? "Hi there! I'm your AI Farming Assistant. I can help you manage your farm. Let me give you a quick tour." : "ഹായ്! ഞാൻ നിങ്ങളുടെ AI ഫാമിംഗ് അസിസ്റ്റന്റാണ്. നിങ്ങളുടെ കൃഷിയിടം നിയന്ത്രിക്കാൻ എന്നെ സഹായിക്കാനാകും. ഒരു ചെറിയ ടൂർ തരാം.",
      title: language === 'en' ? "Welcome!" : "സ്വാഗതം!",
    },
    {
      text: language === 'en' ? "This is your daily tasks list. You can check off tasks as you complete them." : "ഇതാണ് നിങ്ങളുടെ ദൈനംദിന ടാസ്ക്കുകളുടെ ലിസ്റ്റ്. പൂർത്തിയാകുന്ന ടാസ്ക്കുകൾ നിങ്ങൾക്ക് ഇവിടെ ടിക്ക് ചെയ്യാം.",
      title: language === 'en' ? "Daily Tasks" : "ദൈനംദിന ടാസ്ക്കുകൾ",
    },
    {
      text: language === 'en' ? "This is the AI Chatbot. You can ask me questions about your crops or get personalized advice. You can type, use your voice, or even upload a picture!" : "ഇതാണ് AI ചാറ്റ്ബോട്ട്. നിങ്ങളുടെ വിളകളെക്കുറിച്ച് എന്നോട് ചോദ്യങ്ങൾ ചോദിക്കാം അല്ലെങ്കിൽ വ്യക്തിപരമായ ഉപദേശം നേടാം. നിങ്ങൾക്ക് ടൈപ്പ് ചെയ്യാനോ, ശബ്ദം ഉപയോഗിക്കാനോ, അല്ലെങ്കിൽ ഒരു ചിത്രം അപ്‌ലോഡ് ചെയ്യാനോ കഴിയും!",
      title: language === 'en' ? "AI Chatbot" : "AI ചാറ്റ്ബോട്ട്",
    },
    {
      text: language === 'en' ? "This is where you'll find important alerts about your farm, like low soil moisture or pest warnings." : "നിങ്ങളുടെ കൃഷിയിടത്തെക്കുറിച്ചുള്ള പ്രധാനപ്പെട്ട അലേർട്ടുകൾ ഇവിടെ കാണാം, ഉദാഹരണത്തിന് കുറഞ്ഞ മണ്ണിന്റെ ഈർപ്പം അല്ലെങ്കിൽ കീടങ്ങളുടെ മുന്നറിയിപ്പുകൾ.",
      title: language === 'en' ? "Alerts" : "അലേർട്ടുകൾ",
    },
    {
      text: language === 'en' ? "These are AI-powered recommendations tailored to your specific farm data. I will give you smart tips on what to do next." : "ഇത് നിങ്ങളുടെ കൃഷിയിടത്തിലെ വിവരങ്ങൾക്കനുസരിച്ച് AI നൽകുന്ന ശുപാർശകളാണ്. അടുത്തതായി എന്ത് ചെയ്യണം എന്നതിനെക്കുറിച്ച് ഞാൻ നിങ്ങൾക്ക് മികച്ച നുറുങ്ങുകൾ നൽകും.",
      title: language === 'en' ? "AI Recommendations" : "AI ശുപാർശകൾ",
    },
    {
      text: language === 'en' ? "Check here for real-time market prices of key crops to help you make informed decisions." : "കൃത്യമായ തീരുമാനങ്ങൾ എടുക്കാൻ പ്രധാന വിളകളുടെ തത്സമയ മാർക്കറ്റ് വിലകൾ ഇവിടെ പരിശോധിക്കുക.",
      title: language === 'en' ? "Market Price" : "മാർക്കറ്റ് വില",
    },
    {
      text: language === 'en' ? "That's the end of the tour! I'm here to help whenever you need me. Just tap my icon again." : "ടൂർ ഇവിടെ അവസാനിക്കുന്നു! നിങ്ങൾക്ക് ആവശ്യമുള്ളപ്പോൾ ഞാൻ ഇവിടെ ഉണ്ടാകും. എന്റെ ഐക്കണിൽ വീണ്ടും ടാപ്പുചെയ്യുക.",
      title: language === 'en' ? "Tour Complete" : "ടൂർ പൂർത്തിയായി",
    },
  ];

  const handleNextStep = () => {
    if (assistantStep < tourSteps.length - 1) {
      setAssistantStep(assistantStep + 1);
    } else {
      setIsAssistantOpen(false);
      setAssistantStep(0);
    }
  };

  const currentStep = tourSteps[assistantStep];

  const translations = {
    en: {
      dashboard: "Dashboard",
      manageCrops: "Manage Crops",
      calendar: "Calendar",
      weather: "Weather",
      dailyTasks: "Daily Tasks",
      chatbot: "AI Chatbot",
      alerts: "Alerts",
      recommendations: "AI Recommendations",
      marketPrice: "Market Price",
      low: "Low",
      high: "High",
      medium: "Medium",
      clearAll: "Clear All",
      placeholder: "Type a message, or use the microphone or camera...",
      send: "Send",
      today: "Today",
      crops: "Crops",
      plantingDate: "Planting Date",
      status: "Status",
      events: "Events",
      welcome: "Welcome back, Farmer!",
      next: "Next",
      close: "Close",
      sun: "Sun", mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu", fri: "Fri", sat: "Sat"
    },
    ml: {
      dashboard: "ഡാഷ്‌ബോർഡ്",
      manageCrops: "വിളകൾ കൈകാര്യം ചെയ്യുക",
      calendar: "കലണ്ടർ",
      weather: "കാലാവസ്ഥ",
      dailyTasks: "ദൈനംദിന ടാസ്ക്കുകൾ",
      chatbot: "AI ചാറ്റ്ബോട്ട്",
      alerts: "അലേർട്ടുകൾ",
      recommendations: "AI ശുപാർശകൾ",
      marketPrice: "മാർക്കറ്റ് വില",
      low: "കുറഞ്ഞത്",
      high: "കൂടിയത്",
      medium: "മിതമായത്",
      clearAll: "എല്ലാം മായ്ക്കുക",
      placeholder: "ഒരു സന്ദേശം ടൈപ്പ് ചെയ്യുക, അല്ലെങ്കിൽ മൈക്രോഫോൺ അല്ലെങ്കിൽ ക്യാമറ ഉപയോഗിക്കുക...",
      send: "അയയ്ക്കുക",
      today: "ഇന്ന്",
      crops: "വിളകൾ",
      plantingDate: "നടീൽ തീയതി",
      status: "നില",
      events: "ഇവന്റുകൾ",
      welcome: "തിരികെ സ്വാഗതം, കർഷകനേ!",
      next: "അടുത്തത്",
      close: "അടയ്ക്കുക",
      sun: "ഞായർ", mon: "തിങ്കൾ", tue: "ചൊവ്വ", wed: "ബുധൻ", thu: "വ്യാഴം", fri: "വെള്ളി", sat: "ശനി"
    }
  };

  const t = translations[language];

  const renderPage = () => {
    switch (activePage) {
      case 'manage-crops':
        return (
          <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.pageTitle}>{t.manageCrops}</Text>
            <View style={styles.cropGrid}>
              {crops.map(crop => (
                <Card key={crop.id} title={crop.name}>
                  <View style={styles.cropCardContent}>
                    <Image source={{ uri: crop.imageUrl }} style={styles.cropImage} />
                    <View style={styles.cropTextContainer}>
                      <Text style={styles.cropText}>{t.plantingDate}: <Text style={styles.cropTextNormal}>{crop.plantingDate}</Text></Text>
                      <Text style={styles.cropText}>{t.status}: <Text style={styles.cropTextNormal}>{crop.status}</Text></Text>
                    </View>
                  </View>
                </Card>
              ))}
            </View>
          </ScrollView>
        );
      case 'calendar':
        const daysOfWeek = [t.sun, t.mon, t.tue, t.wed, t.thu, t.fri, t.sat];
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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
          <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.pageTitle}>{t.calendar}</Text>
            <Card title={`${monthNames[month]} ${year}`}>
              <View style={styles.calendarHeader}>
                <TouchableOpacity onPress={() => setCurrentDate(new Date(year, month - 1, 1))}>
                  <Text style={styles.navButton}>{'<'}</Text>
                </TouchableOpacity>
                <Text style={styles.calendarMonthText}>{monthNames[month]} {year}</Text>
                <TouchableOpacity onPress={() => setCurrentDate(new Date(year, month + 1, 1))}>
                  <Text style={styles.navButton}>{'>'}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.daysOfWeekContainer}>
                {daysOfWeek.map(day => <Text key={day} style={styles.dayOfWeekText}>{day}</Text>)}
              </View>
              <View style={styles.daysGrid}>
                {days}
              </View>
            </Card>
            <Card title={t.events}>
              <View style={styles.eventList}>
                {calendarEvents.map((event, index) => (
                  <View key={index} style={styles.eventItem}>
                    <Text style={styles.eventEmoji}>
                      {event.type === 'planting' ? '🌱' : event.type === 'harvest' ? '🌾' : '🧪'}
                    </Text>
                    <View>
                      <Text style={styles.eventTitle}>{event.event}</Text>
                      <Text style={styles.eventDate}>{event.date}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </Card>
          </ScrollView>
        );
      case 'dashboard':
      default:
        return (
          <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.pageTitle}>{t.welcome}</Text>

            <Card title={t.weather}>
              <View style={styles.weatherCardContent}>
                <Text style={styles.weatherEmoji}>☀️</Text>
                <View>
                  <Text style={styles.weatherTemp}>28°C, {t.today}</Text>
                  <Text style={styles.weatherDescription}>Sunny with a slight breeze</Text>
                </View>
              </View>
            </Card>

            <Card title={t.dailyTasks}>
              <View style={styles.taskList}>
                {tasks.map(task => (
                  <View key={task.id} style={styles.taskItem}>
                    <TouchableOpacity onPress={() => toggleTask(task.id)} style={styles.checkbox}>
                      {task.completed && <Text style={styles.checkboxChecked}>✓</Text>}
                    </TouchableOpacity>
                    <Text style={[styles.taskText, task.completed && styles.taskTextCompleted]}>
                      {task.text}
                    </Text>
                  </View>
                ))}
              </View>
            </Card>

            <Card title={t.chatbot}>
              <View style={styles.chatbotContainer}>
                <View style={styles.chatHistory}>
                  <View style={styles.chatMessage}>
                    <Text style={styles.chatEmoji}>🤖</Text>
                    <View style={styles.chatBubble}>
                      <Text style={styles.chatText}>{language === 'en' ? "Hello! How can I help with your farming today?" : "ഹലോ! ഇന്ന് നിങ്ങളുടെ കൃഷിയെ എങ്ങനെ സഹായിക്കാനാകും?"}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.chatInputContainer}>
                  <TextInput
                    style={styles.chatInput}
                    placeholder={t.placeholder}
                  />
                  <TouchableOpacity style={styles.chatButton}>
                    <Text style={styles.buttonText}>Send</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Card>

            <Card title={t.alerts}>
              <View style={styles.alertList}>
                {alerts.length > 0 ? (
                  alerts.map(alert => (
                    <View key={alert.id} style={styles.alertItem}>
                      <View style={[styles.alertDot, { backgroundColor: alert.level === 'High' ? '#ef4444' : '#f59e0b' }]}></View>
                      <Text style={styles.alertText}>{alert.text}</Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.noAlertsText}>{language === 'en' ? "No new alerts." : "പുതിയ അലേർട്ടുകളൊന്നുമില്ല."}</Text>
                )}
              </View>
              {alerts.length > 0 && (
                <TouchableOpacity onPress={clearAlerts} style={styles.clearAlertsButton}>
                  <Text style={styles.clearAlertsButtonText}>{t.clearAll}</Text>
                </TouchableOpacity>
              )}
            </Card>

            <Card title={t.recommendations}>
              <Text style={styles.recommendationText}>{language === 'en' ? "Based on current weather and soil data, we recommend increasing irrigation by 15% for your corn fields over the next three days." : "നിലവിലെ കാലാവസ്ഥയും മണ്ണിന്റെ വിവരങ്ങളും അനുസരിച്ച്, അടുത്ത മൂന്ന് ദിവസത്തേക്ക് നിങ്ങളുടെ ചോളം പാടങ്ങൾക്ക് 15% കൂടുതൽ നനയ്ക്കാൻ ഞങ്ങൾ ശുപാർശ ചെയ്യുന്നു."}</Text>
            </Card>

            <Card title={t.marketPrice}>
              <View style={styles.marketPriceList}>
                <View style={styles.marketPriceItem}>
                  <Text style={styles.marketPriceLabel}>Wheat:</Text>
                  <Text style={styles.marketPriceValue}>$7.20 / bushel</Text>
                </View>
                <View style={styles.marketPriceItem}>
                  <Text style={styles.marketPriceLabel}>Corn:</Text>
                  <Text style={styles.marketPriceValue}>$5.85 / bushel</Text>
                </View>
                <View style={styles.marketPriceItem}>
                  <Text style={styles.marketPriceLabel}>Soybeans:</Text>
                  <Text style={styles.marketPriceValue}>$13.50 / bushel</Text>
                </View>
              </View>
            </Card>

          </ScrollView>
        );
    }
  };

  return (
    <View style={styles.appContainer}>
      {/* Top Navigation */}
      <View style={styles.navBar}>
        <Text style={styles.navTitle}>AI Farmer</Text>
        <View style={styles.navItems}>
          <TouchableOpacity onPress={() => setActivePage('dashboard')} style={[styles.navButtonText, activePage === 'dashboard' && styles.navButtonActive]}>
            <Text style={styles.navButtonText}>{t.dashboard}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActivePage('manage-crops')} style={[styles.navButtonText, activePage === 'manage-crops' && styles.navButtonActive]}>
            <Text style={styles.navButtonText}>{t.manageCrops}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActivePage('calendar')} style={[styles.navButtonText, activePage === 'calendar' && styles.navButtonActive]}>
            <Text style={styles.navButtonText}>{t.calendar}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>{renderPage()}</View>

      {/* Floating AI Assistant */}
      <TouchableOpacity
        style={styles.assistantIcon}
        onPress={startTour}
      >
        <Image
          source={{ uri: "https://placehold.co/64x64/34D399/FFFFFF/png?text=AI" }}
          style={styles.assistantImage}
        />
      </TouchableOpacity>

      {isAssistantOpen && (
        <View style={styles.assistantBubble}>
          <Text style={styles.assistantTitle}>{currentStep.title}</Text>
          <Text style={styles.assistantText}>{currentStep.text}</Text>
          <View style={styles.assistantButtons}>
            <TouchableOpacity onPress={() => setIsAssistantOpen(false)} style={styles.assistantCloseButton}>
              <Text style={styles.assistantButtonText}>{t.close}</Text>
            </TouchableOpacity>
            {assistantStep < tourSteps.length - 1 && (
              <TouchableOpacity onPress={handleNextStep} style={styles.assistantNextButton}>
                <Text style={styles.assistantButtonText}>{t.next}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

// Reusable Card Component
const Card = ({ title, children }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    <View style={styles.cardContent}>
      {children}
    </View>
  </View>
);

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  navBar: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  navTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#14532d',
  },
  navItems: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  navButtonText: {
    color: '#4b5563',
    fontWeight: '500',
    fontSize: 16,
  },
  navButtonActive: {
    color: '#14532d',
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 24,
  },
  container: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#14532d',
    marginBottom: 16,
  },
  cardContent: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 16,
  },
  // Calendar styles
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarMonthText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  navButton: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  daysOfWeekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  dayOfWeekText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#4b5563',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: '14.28%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  calendarDayText: {
    color: '#4b5563',
  },
  calendarEventDot: {
    position: 'absolute',
    bottom: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22c55e',
  },
  calendarDayEmpty: {
    width: '14.28%',
    height: 40,
  },
  eventList: {
    paddingVertical: 16,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  eventEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  eventDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  // Manage Crops styles
  cropGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cropCardContent: {
    alignItems: 'center',
  },
  cropImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: '#22c55e',
    marginBottom: 16,
  },
  cropTextContainer: {
    alignItems: 'center',
  },
  cropText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  cropTextNormal: {
    fontWeight: '400',
  },
  // Dashboard styles
  weatherCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherEmoji: {
    fontSize: 48,
    marginRight: 16,
  },
  weatherTemp: {
    fontSize: 24,
    fontWeight: '600',
    color: '#374151',
  },
  weatherDescription: {
    color: '#6b7280',
  },
  taskList: {
    marginTop: 16,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#14532d',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    color: '#14532d',
    fontWeight: 'bold',
  },
  taskText: {
    fontSize: 16,
    color: '#374151',
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  chatbotContainer: {
    flexDirection: 'column',
  },
  chatHistory: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    height: 160,
    marginBottom: 16,
  },
  chatMessage: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  chatEmoji: {
    fontSize: 24,
    marginRight: 8,
  },
  chatBubble: {
    backgroundColor: '#d1d5db',
    padding: 12,
    borderRadius: 8,
    maxWidth: 250,
  },
  chatText: {
    fontSize: 14,
    color: '#1f2937',
  },
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  chatButton: {
    backgroundColor: '#3b82f6',
    padding: 12,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  alertList: {
    marginTop: 16,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  alertText: {
    color: '#374151',
  },
  noAlertsText: {
    color: '#6b7280',
  },
  clearAlertsButton: {
    marginTop: 16,
    backgroundColor: '#ef4444',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearAlertsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  recommendationText: {
    color: '#374151',
  },
  marketPriceList: {
    marginTop: 16,
  },
  marketPriceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  marketPriceLabel: {
    color: '#374151',
  },
  marketPriceValue: {
    fontWeight: '600',
  },
  assistantIcon: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  assistantImage: {
    width: 64,
    height: 64,
  },
  assistantBubble: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: 288,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  assistantTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
    color: '#14532d',
  },
  assistantText: {
    fontSize: 14,
    color: '#374151',
  },
  assistantButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  assistantCloseButton: {
    backgroundColor: '#9ca3af',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  assistantNextButton: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  assistantButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default App;
