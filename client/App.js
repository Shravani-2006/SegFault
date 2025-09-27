import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Animated, Easing } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

// Import data and translations
// This path assumes App.js is in the root directory and your data is in './components/data.js'
import { translations } from './components/translations';
import { initialTasks, initialAlerts, initialCrops, calendarEvents } from './components/data.js';

// Import components
import NavItem from './components/NavItem';
import Alerts from './components/Alerts';
import DailyTasks from './components/DailyTasks';
import Chatbot from './components/Chatbot';
// import Recommendations from './components/Recommendations';
import MarketPrice from './components/MarketPrice';
import Crops from './components/Crops';
import Calendar from './components/Calendar';
import Weather from './components/Weather';
// import AssistantModal from './components/AssistantModal';

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
                    useNativeDriver: false,
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
            <Weather t={t} styles={styles} />
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
                return <Calendar calendarEvents={calendarEvents} t={t} translateText={translateText} currentDate={currentDate} setCurrentDate={setCurrentDate} styles={styles} pulseAnim={pulseAnim} />;
            case 'chatbot':
                // Render Chatbot directly outside the ScrollView to fill the page
                return <Chatbot t={t} />;
            case 'dashboard':
            default:
                return (
                    // Wrap dashboard content in a Fragment
                    <>
                        <Text style={styles.pageTitle}>{t.welcome}</Text>
                        {renderDashboard()}
                    </>
                );
        }
    };

    // The main return statement for the App component
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
                {activePage !== 'chatbot' ? (
                    <ScrollView style={styles.mainContent} contentContainerStyle={styles.pageContainer}>
                        {renderPage()}
                    </ScrollView>
                ) : (
                    // Render chatbot here to take up the full space
                    <View style={{ flex: 1 }}>{renderPage()}</View>
                )}

                {/* Footer Navigation */}
                <View style={styles.footer}>
                    <NavItem icon="home" text={t.dashboard} onPress={() => setActivePage('dashboard')} isActive={activePage === 'dashboard'} styles={styles} />
                    <NavItem icon="seedling" text={t.manageCrops} onPress={() => setActivePage('manage-crops')} isActive={activePage === 'manage-crops'} styles={styles} />
                    <NavItem icon="comment-dots" text={t.chatbot} onPress={() => setActivePage('chatbot')} isActive={activePage === 'chatbot'} styles={styles} />
                    <NavItem icon="calendar-alt" text={t.calendar} onPress={() => setActivePage('calendar')} isActive={activePage === 'calendar'} styles={styles} />
                </View>

                {/* Floating AI Assistant button */}
                {/* <TouchableOpacity onPress={startTour} style={styles.aiButton}>
                    <FontAwesome5 name="robot" size={30} color="white" />
                </TouchableOpacity> */}

                {/* AI Assistant Modal */}
                {/* <AssistantModal
                    visible={isAssistantOpen}
                    onClose={closeTour}
                    currentStep={t.tour[assistantStep]}
                    handleNextStep={handleNextStep}
                    isLastStep={assistantStep === t.tour.length - 1}
                    t={t}
                    styles={styles}
                /> */}
            </View>
        </SafeAreaView>
    );
};

// Main stylesheet for the application
const styles = StyleSheet.create({
    /* Layout */
    safeArea: {
        flex: 1,
        backgroundColor: '#F1F8F5', // Lighter, softer green background
    },
    container: {
        flex: 1,
        backgroundColor: '#F1F8F5',
    },

    /* Header */
    header: {
        padding: 16,
        paddingTop: 40,
        backgroundColor: '#225740', // Deep, elegant forest green
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomLeftRadius: 24, // Softer curves
        borderBottomRightRadius: 24,
    },
    headerTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 12,
    },
    languageSwitcher: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Subtle transparency
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    languageText: {
        fontSize: 14,
        fontWeight: '600',
        color: 'white',
    },

    /* Main Content */
    mainContent: {
        flex: 1,
    },
    pageContainer: {
        padding: 16,
    },
    pageTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1A4731', // Dark green for titles
        textAlign: 'center',
        marginBottom: 24,
    },

    /* Card */
    cardContainer: {
        backgroundColor: 'white',
        borderRadius: 20, // More rounded
        padding: 16,
        marginBottom: 20,
        shadowColor: '#1A4731', // Green-tinted shadow
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 5,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1A4731',
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E7EB', // Subtle separator line
        paddingBottom: 8,
    },

    /* Alerts */
    alertItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#FEF3C7', // Soft yellow for alerts
        borderRadius: 12,
        marginBottom: 8,
    },
    alertDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 12,
    },
    alertText: {
        color: '#713F12', // Darker text for readability
        flexShrink: 1,
    },
    noAlertsText: {
        color: '#6B7280',
        textAlign: 'center',
        paddingVertical: 16,
    },
    clearAllButton: {
        marginTop: 8,
        backgroundColor: '#EF4444',
        borderRadius: 12,
        paddingVertical: 10,
    },
    clearAllButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },

    /* Tasks */
    taskItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6', // Subtle separator
    },
    taskCheckbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#B0C2B9',
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    taskCheckboxCompleted: {
        backgroundColor: '#225740',
        borderColor: '#225740',
    },
    taskText: {
        color: '#374151',
        fontSize: 16,
    },
    taskTextCompleted: {
        textDecorationLine: 'line-through',
        color: '#9CA3AF',
    },

    /* Chatbot Styles */
    chatbotContainer: {
        flex: 1,
        backgroundColor: '#F1F8F5',
    },
    chatbotMessages: { 
        flex: 1, 
        padding: 16 
    },
    botMessage: {
        flexDirection: 'row',
        marginBottom: 16,
        alignSelf: 'flex-start',
    },
    botIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#225740',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    botMessageBubble: {
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 16,
        borderTopLeftRadius: 4,
        maxWidth: '80%',
        shadowColor: '#1A4731',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    botMessageText: { fontSize: 16, color: '#374151' },
    chatInputContainer: {
        flexDirection: 'row',
        padding: 12,
        borderTopWidth: 1,
        borderTopColor: '#E0E7EB',
        backgroundColor: 'white',
    },
    chatInput: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#E0E7EB',
    },
    sendButton: {
        backgroundColor: '#225740',
        borderRadius: 20,
        padding: 12,
        marginLeft: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },

    /* Weather */
    weatherItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    weatherIcon: {
        fontSize: 40,
        marginRight: 16,
        color: '#1A4731',
    },
    weatherText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A4731',
    },
    weatherLabel: {
        fontSize: 14,
        color: '#6B7280',
    },
    errorText: {
        color: '#D9534F',
        textAlign: 'center',
    },

    /* Crops */
    cropItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cropImagePlaceholder: {
        width: 70,
        height: 70,
        borderRadius: 16, // Softer square
        marginRight: 16,
        backgroundColor: '#E0E7EB',
    },
    cropText: {
        fontSize: 16,
        color: '#374151',
        marginBottom: 4,
    },

    /* Calendar */
    calendarHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    calendarNavText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#225740',
    },
    calendarMonthText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1A4731',
    },
    calendarWeekDays: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    calendarWeekDayText: {
        width: '14.28%',
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#6B7280',
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
        position: 'relative',
    },
    calendarDayText: {
        fontSize: 14,
        color: '#374151',
    },
    calendarEventDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#225740',
        position: 'absolute',
        bottom: 6,
    },
    calendarDayEmpty: {
        width: '14.28%',
        aspectRatio: 1,
    },
    
    /* Events */
    eventItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: 'white',
        borderRadius: 12,
        marginBottom: 8,
    },
    eventIcon: {
        fontSize: 24,
        marginRight: 16,
        color: '#225740',
    },
    eventText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A4731',
    },
    eventDate: {
        fontSize: 12,
        color: '#6B7280',
    },

    /* Market Prices */
    marketPriceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    marketPriceLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
    },
    marketPriceValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#225740',
    },

    /* Footer Navigation */
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        paddingVertical: 8,
        paddingBottom: 24, // Safe area padding for bottom
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        shadowColor: '#1A4731',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 10,
    },
    navItemContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        borderRadius: 16,
        minWidth: 70,
    },
    navItemText: {
        fontSize: 12,
        marginTop: 4,
    },
    navItemActive: {
        backgroundColor: '#225740', // Correctly set active background
    },
    navItemInactive: {
        backgroundColor: 'transparent',
    },
    navItemTextActive: {
        color: 'white', // Correctly set active text color to white
        fontWeight: 'bold',
    },
    navItemTextInactive: {
        color: '#6B7280',
    },
});




export default App;
