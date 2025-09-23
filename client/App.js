import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Animated, Easing } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

// Import data and translations
import { translations } from './translations';
import { initialTasks, initialAlerts, initialCrops, calendarEvents } from './data';

// Import components
import NavItem from './components/NavItem';
import Alerts from './components/Alerts';
import DailyTasks from './components/DailyTasks';
import Chatbot from './components/Chatbot';
import Recommendations from './components/Recommendations';
import MarketPrice from './components/MarketPrice';
import Crops from './components/Crops';
import Calendar from './components/Calendar';
import AssistantModal from './components/AssistantModal';

const App = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [language, setLanguage] = useState('en');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [assistantStep, setAssistantStep] = useState(0);
  const [highlightedBlockId, setHighlightedBlockId] = useState(null);

  // State for dynamic data
  const [tasks, setTasks] = useState(initialTasks);
  const [alerts, setAlerts] = useState(initialAlerts);

  const [currentDate, setCurrentDate] = useState(new Date());
  const t = translations[language];

  // Animation for the highlighting effect
  const pulseAnim = useRef(new Animated.Value(0)).current;

  // Helper function to translate dynamic data text
  const translateText = (text) => {
    const key = Object.keys(translations.en).find(k => translations.en[k] === text);
    return key ? t[key] || text : text;
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const clearAlerts = () => {
    setAlerts([]);
  };

  const startPulseAnimation = () => {
    pulseAnim.setValue(0);
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false, // Set to false for layout properties like scale
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ]),
      { iterations: -1 }
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
      closeTour();
    }
  };

  const closeTour = () => {
      setIsAssistantOpen(false);
      setAssistantStep(0);
      setHighlightedBlockId(null);
  }

  const renderDashboard = () => (
    <>
      <Alerts
        id="alerts"
        alerts={alerts}
        t={t}
        translateText={translateText}
        clearAlerts={clearAlerts}
        styles={styles}
        highlightedBlockId={highlightedBlockId}
        pulseAnim={pulseAnim}
      />
      <DailyTasks
        id="daily-tasks"
        tasks={tasks}
        t={t}
        translateText={translateText}
        toggleTask={toggleTask}
        styles={styles}
        highlightedBlockId={highlightedBlockId}
        pulseAnim={pulseAnim}
      />
      <Chatbot
        id="chatbot"
        t={t}
        styles={styles}
        highlightedBlockId={highlightedBlockId}
        pulseAnim={pulseAnim}
      />
      <Recommendations
        id="recommendations"
        t={t}
        styles={styles}
        highlightedBlockId={highlightedBlockId}
        pulseAnim={pulseAnim}
      />
      <MarketPrice
        id="market-price"
        t={t}
        styles={styles}
        highlightedBlockId={highlightedBlockId}
        pulseAnim={pulseAnim}
      />
    </>
  );

  const renderPage = () => {
    switch (activePage) {
      case 'manage-crops':
        return <Crops crops={initialCrops} t={t} translateText={translateText} styles={styles} pulseAnim={pulseAnim} />;
      case 'calendar':
        return <Calendar calendarEvents={calendarEvents} t={t} translateText={translateText} currentDate={currentDate} setCurrentDate={setCurrentDate} styles={styles} pulseAnim={pulseAnim}/>;
      case 'dashboard':
      default:
        return (
          <>
            <Text style={styles.pageTitle}>{t.welcome}</Text>
            {renderDashboard()}
          </>
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
        <ScrollView style={styles.mainContent} contentContainerStyle={styles.pageContainer}>
          {renderPage()}
        </ScrollView>

        {/* Footer Navigation */}
        <View style={styles.footer}>
          <NavItem icon="home" text={t.dashboard} onPress={() => setActivePage('dashboard')} isActive={activePage === 'dashboard'} styles={styles} />
          <NavItem icon="seedling" text={t.manageCrops} onPress={() => setActivePage('manage-crops')} isActive={activePage === 'manage-crops'} styles={styles} />
          <NavItem icon="calendar-alt" text={t.calendar} onPress={() => setActivePage('calendar')} isActive={activePage === 'calendar'} styles={styles} />
        </View>

        {/* Floating AI Assistant button */}
        <TouchableOpacity onPress={startTour} style={styles.aiButton}>
          <FontAwesome5 name="robot" size={30} color="white" />
        </TouchableOpacity>

        {/* AI Assistant Modal */}
        <AssistantModal
            visible={isAssistantOpen}
            onClose={closeTour}
            currentStep={t.tour[assistantStep]}
            handleNextStep={handleNextStep}
            isLastStep={assistantStep === t.tour.length - 1}
            t={t}
            styles={styles}
        />
      </View>
    </SafeAreaView>
  );
};

// Main stylesheet for the application
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f0fdf4' },
  container: { flex: 1, backgroundColor: '#f0fdf4' },
  header: { padding: 16, backgroundColor: '#047857', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomLeftRadius: 16, borderBottomRightRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 5 },
  headerTitleContainer: { flexDirection: 'row', alignItems: 'center' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: 'white', marginLeft: 8 },
  languageSwitcher: { backgroundColor: 'white', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  languageText: { fontSize: 14, fontWeight: '600', color: '#047857' },
  mainContent: { flex: 1, paddingHorizontal: 16 },
  pageContainer: { paddingTop: 16, paddingBottom: 24 },
  pageTitle: { fontSize: 28, fontWeight: 'bold', color: '#047857', textAlign: 'center', marginBottom: 16 },
  cardContainer: { backgroundColor: 'white', borderRadius: 16, padding: 24, marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#1a4731', marginBottom: 16 },
  cardContent: { backgroundColor: '#f0fdf4', borderRadius: 8, padding: 16 },
  alertItem: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: 'white', borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 1, marginBottom: 8 },
  alertDot: { width: 12, height: 12, borderRadius: 6, marginRight: 12 },
  alertText: { color: '#333' },
  noAlertsText: { color: 'gray', textAlign: 'center' },
  clearAllButton: { marginTop: 16, backgroundColor: '#ef4444', borderRadius: 8, paddingVertical: 12 },
  clearAllButtonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
  taskItem: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: 'white', borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 1, marginBottom: 8 },
  taskCheckbox: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#047857', marginRight: 12 },
  taskCheckboxCompleted: { backgroundColor: '#047857' },
  taskText: { color: '#333' },
  taskTextCompleted: { textDecorationLine: 'line-through', color: 'gray' },
  chatbotContainer: { height: 200 },
  chatbotMessages: { flex: 1, backgroundColor: 'white', borderRadius: 8, padding: 16, borderWidth: 1, borderColor: '#eee', marginBottom: 16 },
  botMessage: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8 },
  botIcon: { fontSize: 24, marginRight: 8 },
  botMessageBubble: { backgroundColor: '#e5e7eb', padding: 12, borderRadius: 16, borderBottomLeftRadius: 4, maxWidth: '85%' },
  botMessageText: { fontSize: 14, color: '#374151' },
  chatInputContainer: { flexDirection: 'row', alignItems: 'center' },
  chatInput: { flex: 1, borderRadius: 25, paddingHorizontal: 16, paddingVertical: 12, borderWidth: 1, borderColor: '#d1d5db', backgroundColor: 'white' },
  sendButton: { backgroundColor: '#047857', borderRadius: 25, padding: 12, marginLeft: 8 },
  recommendationText: { color: '#333' },
  cropItem: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#f0fdf4', borderRadius: 12 },
  cropImagePlaceholder: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#8BC34A', marginRight: 16 },
  cropText: { fontSize: 14, fontWeight: '600', color: '#4b5563' },
  calendarHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  calendarNavText: { fontSize: 24, fontWeight: 'bold' },
  calendarMonthText: { fontSize: 18, fontWeight: 'bold' },
  calendarWeekDays: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 8 },
  calendarWeekDayText: { width: '14.28%', textAlign: 'center', fontSize: 12, fontWeight: 'bold', color: 'gray' },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  calendarDay: { width: '14.28%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center', padding: 4, position: 'relative' },
  calendarDayText: { fontSize: 14 },
  calendarEventDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#059669', position: 'absolute', bottom: 4 },
  calendarDayEmpty: { width: '14.28%', aspectRatio: 1 },
  eventItem: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#f3f4f6', borderRadius: 8, marginBottom: 8 },
  eventIcon: { fontSize: 24, marginRight: 16 },
  eventText: { fontSize: 16, fontWeight: '600' },
  eventDate: { fontSize: 12, color: 'gray' },
  marketPriceItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: 12, borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 1, marginBottom: 8 },
  marketPriceLabel: { fontWeight: 'bold', color: '#4b5563' },
  marketPriceValue: { fontWeight: 'bold', color: '#059669' },
  footer: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'white', paddingVertical: 12, borderTopLeftRadius: 20, borderTopRightRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 8 },
  navItemContainer: { alignItems: 'center', justifyContent: 'center', padding: 8, borderRadius: 12, minWidth: 60 },
  navItemText: { fontSize: 10, marginTop: 4, fontWeight: 'bold' },
  navItemActive: { backgroundColor: '#047857' },
  navItemInactive: { backgroundColor: 'transparent' },
  navItemTextActive: { color: 'white' },
  navItemTextInactive: { color: 'gray' },
  aiButton: { position: 'absolute', bottom: 100, right: 24, backgroundColor: '#22c55e', borderRadius: 50, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 8 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  assistantBubble: { backgroundColor: 'white', borderRadius: 16, padding: 24, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 6, elevation: 8, width: '100%', maxWidth: 400 },
  assistantTitle: { fontSize: 20, fontWeight: 'bold', color: '#1a4731', marginBottom: 8, textAlign: 'center' },
  assistantText: { color: '#333', marginBottom: 16, textAlign: 'center' },
  assistantButtons: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  modalButton: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 25, backgroundColor: '#ccc', marginHorizontal: 8 },
  modalNextButton: { backgroundColor: '#22c55e' },
  modalButtonText: { color: 'white', fontWeight: 'bold' },
});

export default App;
