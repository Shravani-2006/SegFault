import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Dimensions, Image } from 'react-native';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 400;

// Reusable Card Component
const Card = ({ title, children }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View>{children}</View>
    </View>
  );
};

const App = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [language, setLanguage] = useState('en');

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
    },
    ml: {
      dashboard: "ഹോം", manageCrops: "വിളകൾ", calendar: "കലണ്ടർ", weather: "കാലാവസ്ഥ", dailyTasks: "ദൈനംദിന ടാസ്ക്കുകൾ", chatbot: "AI ചാറ്റ്ബോട്ട്", alerts: "അലേർട്ടുകൾ", recommendations: "AI ശുപാർശകൾ", marketPrice: "മാർക്കറ്റ് വില", low: "കുറഞ്ഞത്", high: "കൂടിയത്", medium: "മിതമായത്", clearAll: "എല്ലാം മായ്ക്കുക", placeholder: "ഒരു സന്ദേശം ടൈപ്പ് ചെയ്യുക...", send: "അയയ്ക്കുക", today: "ഇന്ന്", crops: "വിളകൾ", plantingDate: "നടീൽ തീയതി", status: "നില", events: "ഇവന്റുകൾ", welcome: "തിരികെ സ്വാഗതം, കർഷകനേ!", next: "അടുത്തത്", close: "അടയ്ക്കുക", sun: "ഞായർ", mon: "തിങ്കൾ", tue: "ചൊവ്വ", wed: "ബുധൻ", thu: "വ്യാഴം", fri: "വെള്ളി", sat: "ശനി", noAlerts: "പുതിയ അലേർട്ടുകൾ ഇല്ല.", chatWelcome: "ഹലോ! ഇന്ന് നിങ്ങളുടെ കൃഷിയെ എങ്ങനെ സഹായിക്കാനാകും?", recommendationText: "നിലവിലെ കാലാവസ്ഥയും മണ്ണിന്റെ വിവരങ്ങളും അനുസരിച്ച്, അടുത്ത മൂന്ന് ദിവസത്തേക്ക് നിങ്ങളുടെ ചോളം പാടങ്ങൾക്ക് 15% കൂടുതൽ നനയ്ക്കാൻ ഞങ്ങൾ ശുപാർശ ചെയ്യുന്നു.", weatherDescription: "സൂര്യപ്രകാശവും നേരിയ കാറ്റും", monthNames: ["ജനുവരി", "ഫെബ്രുവരി", "മാർച്ച്", "ഏപ്രിൽ", "മെയ്", "ജൂൺ", "ജൂലൈ", "ഓഗസ്റ്റ്", "സെപ്റ്റംബർ", "ഒക്ടോബർ", "നവംബർ", "ഡിസംബർ"],
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
  
  // Renders the correct screen based on the activePage state.
  const renderPage = () => {
    switch (activePage) {
      case 'manage-crops':
        return (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.pageTitle}>{t.manageCrops}</Text>
            {crops.map(crop => (
              <Card key={crop.id} title={translateText(crop.name)}>
                <View style={styles.cropCardContent}>
                  <Image source={{ uri: `https://placehold.co/150x150/8BC34A/FFFFFF/png?text=${crop.name}` }} style={styles.cropImage} />
                  <View style={styles.cropInfo}>
                    <Text style={styles.cropText}>{t.plantingDate}: <Text style={styles.cropSubText}>{crop.plantingDate}</Text></Text>
                    <Text style={styles.cropText}>{t.status}: <Text style={styles.cropSubText}>{translateText(crop.status)}</Text></Text>
                  </View>
                </View>
              </Card>
            ))}
          </ScrollView>
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
          days.push(<View key={`empty-${i}`} style={styles.dayEmpty} />);
        }
        for (let i = 1; i <= daysInMonth; i++) {
          const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
          const hasEvent = calendarEvents.some(event => event.date === dateString);
          days.push(
            <View key={i} style={styles.dayContainer}>
              <Text style={styles.dayText}>{i}</Text>
              {hasEvent && <View style={styles.dayEvent} />}
            </View>
          );
        }

        return (
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.pageTitle}>{t.calendar}</Text>
            <Card title={`${monthNames[month]} ${year}`}>
              <View style={styles.calendarHeader}>
                <TouchableOpacity onPress={() => setCurrentDate(new Date(year, month - 1, 1))}>
                  <Text style={styles.calendarNav}>&lt;</Text>
                </TouchableOpacity>
                <Text style={styles.calendarMonth}>{monthNames[month]} {year}</Text>
                <TouchableOpacity onPress={() => setCurrentDate(new Date(year, month + 1, 1))}>
                  <Text style={styles.calendarNav}>&gt;</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.calendarDaysOfWeek}>
                {daysOfWeek.map(day => <Text key={day} style={styles.calendarDayText}>{day}</Text>)}
              </View>
              <View style={styles.calendarDaysContainer}>
                {days}
              </View>
            </Card>
            <Card title={t.events}>
              <View style={styles.eventList}>
                {calendarEvents.map((event, index) => (
                  <View key={index} style={styles.eventItem}>
                    <Text style={styles.eventIcon}>{event.type === 'planting' ? '🌱' : event.type === 'harvest' ? '🌾' : '🧪'}</Text>
                    <View>
                      <Text style={styles.eventTitle}>{translateText(event.event)}</Text>
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
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.pageTitle}>{t.welcome}</Text>
            <Card title={t.weather}>
              <View style={styles.weatherContainer}>
                <Text style={styles.weatherIcon}>☀️</Text>
                <View>
                  <Text style={styles.weatherTitle}>{t.today}</Text>
                  <Text style={styles.weatherText}>28°C, {t.weatherDescription}</Text>
                </View>
              </View>
            </Card>

            <Card title={t.dailyTasks}>
              <View style={styles.taskList}>
                {tasks.map(task => (
                  <View key={task.id} style={styles.taskItem}>
                    <TouchableOpacity onPress={() => toggleTask(task.id)} style={[styles.taskCheckbox, task.completed && styles.taskCheckboxCompleted]}>
                      {task.completed && <Text style={styles.checkmark}>✓</Text>}
                    </TouchableOpacity>
                    <Text style={[styles.taskText, task.completed && styles.taskTextCompleted]}>
                      {translateText(task.text)}
                    </Text>
                  </View>
                ))}
              </View>
            </Card>

            <Card title={t.chatbot}>
              <View style={styles.chatbotContainer}>
                <View style={styles.chatHistory}>
                  <View style={styles.chatMessage}>
                    <Text style={styles.chatBotIcon}>🤖</Text>
                    <View style={styles.chatBubble}>
                      <Text style={styles.chatText}>{t.chatWelcome}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.chatInputContainer}>
                  <TouchableOpacity style={styles.inputButton}>
                    <Text style={styles.inputIcon}>📸</Text>
                  </TouchableOpacity>
                  <TextInput
                    style={styles.chatTextInput}
                    placeholder={t.placeholder}
                  />
                  <TouchableOpacity style={styles.inputButton}>
                    <Text style={styles.inputIcon}>🎙️</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.sendButton}>
                    <Text style={styles.sendIcon}>⬆️</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Card>

            <Card title={t.alerts}>
              {alerts.length > 0 ? (
                <View style={styles.alertList}>
                  {alerts.map(alert => (
                    <View key={alert.id} style={styles.alertItem}>
                      <View style={[styles.alertIndicator, { backgroundColor: alert.level === 'High' ? 'red' : 'yellow' }]} />
                      <Text style={styles.alertText}>{translateText(alert.text)}</Text>
                    </View>
                  ))}
                </View>
              ) : (
                <Text style={styles.noAlerts}>{t.noAlerts}</Text>
              )}
              {alerts.length > 0 && (
                <TouchableOpacity onPress={clearAlerts} style={styles.clearButton}>
                  <Text style={styles.clearButtonText}>{t.clearAll}</Text>
                </TouchableOpacity>
              )}
            </Card>

            <Card title={t.recommendations}>
              <Text style={styles.recommendationText}>{t.recommendationText}</Text>
            </Card>

            <Card title={t.marketPrice}>
              <View style={styles.priceList}>
                <View style={styles.priceItem}>
                  <Text style={styles.priceCrop}>{t.crop3}:</Text>
                  <Text style={styles.priceValue}>$7.20 / bushel</Text>
                </View>
                <View style={styles.priceItem}>
                  <Text style={styles.priceCrop}>{t.crop1}:</Text>
                  <Text style={styles.priceValue}>$5.85 / bushel</Text>
                </View>
                <View style={styles.priceItem}>
                  <Text style={styles.priceCrop}>{t.crop2}:</Text>
                  <Text style={styles.priceValue}>$13.50 / bushel</Text>
                </View>
              </View>
            </Card>
          </ScrollView>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerIcon}>🚜</Text>
          <Text style={styles.headerTitle}>Krishi Sakhi</Text>
        </View>
        <View style={styles.languageContainer}>
          <Text style={styles.languageText}>{language === 'en' ? 'English' : 'മലയാളം'}</Text>
          <Text style={styles.languageArrow}>▼</Text>
          <TouchableOpacity
            style={StyleSheet.absoluteFillObject}
            onPress={() => setLanguage(language === 'en' ? 'ml' : 'en')}
          />
        </View>
      </View>

      <View style={styles.mainContent}>
        {renderPage()}
      </View>

      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => setActivePage('dashboard')} style={[styles.navButton, activePage === 'dashboard' && styles.navButtonActive]}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={[styles.navText, activePage === 'dashboard' && styles.navTextActive]}>{t.dashboard}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActivePage('manage-crops')} style={[styles.navButton, activePage === 'manage-crops' && styles.navButtonActive]}>
          <Text style={styles.navIcon}>🍃</Text>
          <Text style={[styles.navText, activePage === 'manage-crops' && styles.navTextActive]}>{t.manageCrops}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActivePage('calendar')} style={[styles.navButton, activePage === 'calendar' && styles.navButtonActive]}>
          <Text style={styles.navIcon}>🗓️</Text>
          <Text style={[styles.navText, activePage === 'calendar' && styles.navTextActive]}>{t.calendar}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FDF4',
  },
  header: {
    backgroundColor: '#166534',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerIcon: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  languageContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageText: {
    color: '#4B5563',
    fontSize: 14,
  },
  languageArrow: {
    marginLeft: 4,
    fontSize: 10,
    color: '#4B5563',
  },
  mainContent: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 24,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#042F2E',
    marginBottom: 16,
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherIcon: {
    fontSize: 40,
    marginRight: 16,
  },
  weatherTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  weatherText: {
    color: '#4B5563',
  },
  taskList: {
    gap: 8,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#16A34A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskCheckboxCompleted: {
    backgroundColor: '#16A34A',
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
  },
  taskText: {
    marginLeft: 12,
    color: '#4B5563',
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  chatbotContainer: {
    height: 256,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'column',
  },
  chatHistory: {
    flex: 1,
    overflow: 'hidden',
    marginBottom: 12,
  },
  chatMessage: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  chatBotIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  chatBubble: {
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    maxWidth: '75%',
  },
  chatText: {
    fontSize: 14,
  },
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  inputButton: {
    padding: 8,
  },
  inputIcon: {
    fontSize: 24,
    color: '#6B7280',
  },
  chatTextInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
  },
  sendButton: {
    backgroundColor: '#16A34A',
    borderRadius: 999,
    padding: 8,
  },
  sendIcon: {
    fontSize: 24,
    color: 'white',
    transform: [{ rotate: '-45deg' }],
  },
  alertList: {
    gap: 8,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertIndicator: {
    width: 12,
    height: 12,
    borderRadius: 999,
    marginRight: 8,
  },
  alertText: {
    color: '#4B5563',
  },
  noAlerts: {
    color: '#6B7280',
  },
  clearButton: {
    marginTop: 16,
    width: '100%',
    backgroundColor: '#EF4444',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  clearButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  recommendationText: {
    color: '#4B5563',
  },
  priceList: {
    gap: 8,
  },
  priceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceCrop: {
    color: '#4B5563',
    fontWeight: '600',
  },
  priceValue: {
    color: '#166534',
  },
  cropCardContent: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  cropImage: {
    width: 96,
    height: 96,
    borderRadius: 999,
    borderWidth: 4,
    borderColor: '#16A34A',
    marginBottom: 16,
  },
  cropInfo: {
    alignItems: 'center',
  },
  cropText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
  },
  cropSubText: {
    fontWeight: '400',
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarNav: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4B5563',
  },
  calendarMonth: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  calendarDaysOfWeek: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  calendarDayText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6B7280',
    width: '14.28%',
    textAlign: 'center',
  },
  calendarDaysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayEmpty: {
    width: '14.28%',
    height: 40,
  },
  dayContainer: {
    width: '14.28%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  dayText: {
    color: '#4B5563',
  },
  dayEvent: {
    position: 'absolute',
    bottom: 4,
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#22C55E',
  },
  eventList: {
    gap: 16,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 8,
  },
  eventIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  eventDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  navBar: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  navButton: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 8,
    borderRadius: 16,
  },
  navButtonActive: {
    backgroundColor: '#166534',
  },
  navIcon: {
    fontSize: 24,
    color: '#6B7280',
  },
  navText: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: '600',
    color: '#6B7280',
  },
  navTextActive: {
    color: 'white',
  },
});

export default App;
