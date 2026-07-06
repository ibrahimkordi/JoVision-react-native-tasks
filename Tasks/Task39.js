import React, { useState, Component } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-redux';
import { createStore } from 'redux';
import { Provider, connect, useSelector, useDispatch } from 'react-redux';

// ==========================================
// 1. إعداد الـ Redux (Actions, Reducer, Store)
// ==========================================
const UPDATE_FUNC_TEXT = 'UPDATE_FUNC_TEXT';
const UPDATE_CLASS_TEXT = 'UPDATE_CLASS_TEXT';

const initialState = {
    funcText: '',
    classText: ''
};

function textReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_FUNC_TEXT:
            return { ...state, funcText: action.payload };
        case UPDATE_CLASS_TEXT:
            return { ...state, classText: action.payload };
        default:
            return state;
    }
}

const store = createStore(textReducer);

// ==========================================
// 2. Component One (Functional Version) - Task 39
// ==========================================
const FunctionalComponentOne = () => {
    const textValue = useSelector(function(state) { return state.funcText; });
    const dispatch = useDispatch();

    function handleTextChange(text) {
        try {
            dispatch({ type: UPDATE_FUNC_TEXT, payload: text });
        } catch (e) {
            console.error(e.message);
        }
    }

    return (
        <View style={styles.boxFunc}>
            <Text style={styles.boxTitle}>Functional Component (Task 39)</Text>
            <TextInput
                style={styles.input}
                placeholder="Type and hide me..."
                value={textValue}
                onChangeText={handleTextChange}
            />
            <Text style={styles.savedText}>Stored in Redux: {textValue || 'None'}</Text>
        </View>
    );
};

// ==========================================
// 3. Component One (Class Version) - Task 40
// ==========================================
class ClassComponentOne extends Component {
    constructor(props) {
        super(props);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleTextChange(text) {
        try {
            this.props.dispatch({ type: UPDATE_CLASS_TEXT, payload: text });
        } catch (e) {
            console.error(e.message);
        }
    }

    render() {
        return (
            <View style={styles.boxClass}>
                <Text style={styles.boxTitle}>Class Component (Task 40)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Type and hide me..."
                    value={this.props.classText}
                    onChangeText={this.handleTextChange}
                />
                <Text style={styles.savedText}>Stored in Redux: {this.props.classText || 'None'}</Text>
            </View>
        );
    }
}

// ربط الـ Class Component بالـ Redux Store
const ConnectedClassComponent = connect(function(state) {
    return { classText: state.classText };
})(ClassComponentOne);

// ==========================================
// 4. Main Component Container with Toggles
// ==========================================
const Task39Container = () => {
    const [visible, setVisible] = useState(true);

    function toggleVisibility() {
        try {
            setVisible(function(prev) { return !prev; });
        } catch (e) {
            console.error(e.message);
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.mainTitle}>Redux State Persistence (Task 39 & 40)</Text>
            
            <View style={styles.buttonWrapper}>
                <Button 
                    title={visible ? "Unmount & Hide Components" : "Mount & Show Components"} 
                    onPress={toggleVisibility} 
                    color={visible ? "#e74c3c" : "#2ecc71"}
                />
            </View>

            {/* عند الإخفاء يتم عمل Unmount كامل للمكونات الفرعية */}
            {visible ? (
                <View style={styles.innerWrapper}>
                    <FunctionalComponentOne />
                    <ConnectedClassComponent />
                </View>
            ) : (
                <Text style={styles.placeholderText}>Components completely unmounted from memory.</Text>
            )}
        </ScrollView>
    );
};

// تصدير المكون مغلفاً بالـ Provider ليعمل بشكل مستقل
const Task39 = () => (
    <Provider store={store}>
        <Task39Container />
    </Provider>
);

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: '#fcfcfc', flexGrow: 1, justifyContent: 'center' },
    mainTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
    buttonWrapper: { marginBottom: 30 },
    innerWrapper: { width: '100%' },
    boxFunc: { padding: 15, backgroundColor: '#e8f8f5', borderRadius: 8, marginBottom: 20, borderWidth: 1, borderColor: '#a3e4d7' },
    boxClass: { padding: 15, backgroundColor: '#fef9e7', borderRadius: 8, marginBottom: 20, borderWidth: 1, borderColor: '#f9e79f' },
    boxTitle: { fontSize: 14, fontWeight: 'bold', color: '#34495e', marginBottom: 8 },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 8, backgroundColor: '#fff', marginBottom: 10 },
    savedText: { fontSize: 13, color: '#7f8c8d', fontWeight: '500' },
    placeholderText: { textAlign: 'center', color: '#c0392b', fontStyle: 'italic', fontSize: 15 }
});

export default Task39;