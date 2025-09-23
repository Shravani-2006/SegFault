import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Card from './Card';

const DailyTasks = ({ id, tasks, t, translateText, toggleTask, styles, highlightedBlockId, pulseAnim }) => {
  return (
    <Card title={t.dailyTasks} id={id} styles={styles} highlightedBlockId={highlightedBlockId} pulseAnim={pulseAnim}>
      {tasks.map(task => (
        <TouchableOpacity key={task.id} onPress={() => toggleTask(task.id)} style={styles.taskItem}>
          <View style={[styles.taskCheckbox, task.completed && styles.taskCheckboxCompleted]} />
          <Text style={[styles.taskText, task.completed && styles.taskTextCompleted]}>
            {translateText(task.text)}
          </Text>
        </TouchableOpacity>
      ))}
    </Card>
  );
};

export default DailyTasks;
