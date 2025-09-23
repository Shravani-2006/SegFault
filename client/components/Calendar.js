import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Card from './Card';

const Calendar = ({ calendarEvents, t, translateText, currentDate, setCurrentDate, styles, pulseAnim }) => {
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
        <>
            <Text style={styles.pageTitle}>{t.calendar}</Text>
            <Card title={`${monthNames[month]} ${year}`} styles={styles} pulseAnim={pulseAnim}>
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
            <Card title={t.events} styles={styles} pulseAnim={pulseAnim}>
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
        </>
    );
};

export default Calendar;
