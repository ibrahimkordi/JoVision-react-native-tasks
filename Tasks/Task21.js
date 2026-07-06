import React, { Component, useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { Button, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';

// ==========================================
// 1. MyClassPage Component (Tasks: 19, 20, 23, 25)
// ==========================================
class MyClassPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            childText: ''
        };
        // ربط الدوال لحفظ الـ Scope
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    // الـ Lifecycle لتاسك 20
    componentDidMount() {
        console.log("MyClassPage loaded");
    }

    componentWillUnmount() {
        console.log("MyClassPage unloaded");
    }

    // دالة تحديث النص الخارجي عبر الـ Props (Task 23)
    handleInputChange(text) {
        if (this.props.onTextChange) {
            this.props.onTextChange(text);
        }
    }

    // دالة برمجية مدمجة يتم استدعاؤها عبر الـ Ref من الأب (Task 25)
    updateTextFromParent(text) {
        this.setState({ childText: text });
    }

    render() {
        return (
            <View style={styles.childBoxClass}>
                <Text style={styles.childTitle}>Class Component (MyClassPage)</Text>
                
                {/* مدخل النص لتحديث الأب (Task 23) */}
                <TextInput
                    style={styles.input}
                    placeholder="Type to update parent (Props)..."
                    onChangeText={this.handleInputChange}
                />

                {/* نص يستقبل البيانات من الأب عبر الـ Ref فقط (Task 25) */}
                <Text style={styles.resultText}>Ref Text: {this.state.childText}</Text>
            </View>
        );
    }
}

// ==========================================
// 2. MyFunctionPage Component (Tasks: 21, 22, 24)
// ==========================================
const MyFunctionPage = forwardRef(function (props, ref) {
    const [childText, setChildText] = useState('');

    // الـ Lifecycle لتاسك 21 باستخدام useEffect
    useEffect(function () {
        console.log("MyFunctionPage loaded");
        return function () {
            console.log("MyFunctionPage unloaded");
        };
    }, []);

    // دالة منفصلة للتعامل مع تغيير النص لتحديث الأب (Task 22)
    function handleTextChange(text) {
        if (props.onTextChange) {
            props.onTextChange(text);
        }
    }

    // كشف الدالة للأب عبر الـ Ref بدون تمرير الـ State كـ Prop (Task 24)
    useImperativeHandle(ref, function () {
        return {
            updateText: function (text) {
                setChildText(text);
            }
        };
    });

    return (
        <View style={styles.childBoxFunc}>
            <Text style={styles.childTitle}>Functional Component (MyFunctionPage)</Text>
            
            {/* مدخل النص لتحديث الأب (Task 22) */}
            <TextInput
                style={styles.input}
                placeholder="Type to update parent (Props)..."
                onChangeText={handleTextChange}
            />

            {/* نص يستقبل البيانات من الأب عبر الـ Ref فقط (Task 24) */}
            <Text style={styles.resultText}>Ref Text: {childText}</Text>
        </View>
    );
});

// ==========================================
// 3. Parent Component (Main Task Container)
// ==========================================
const Task21 = () => {
    // إدارات الحالات للظهور والإخفاء والـ Props
    const [showClass, setShowClass] = useState(false);
    const [showFunc, setShowFunc] = useState(false);
    const [classParentText, setClassParentText] = useState('Empty');
    const [funcParentText, setFuncParentText] = useState('Empty');

    // الـ Refs للتحكم بالأبناء برمجياً لتاسكات 24 و 25
    const funcRef = useRef(null);
    const classRef = useRef(null);

    // دالتان منفصلتان للتحكم بالأزرار والتنقل
    function toggleClassVisibility() {
        setShowClass(function (prev) { return !prev; });
    }

    function toggleFuncVisibility() {
        setShowFunc(function (prev) { return !prev; });
    }

    // دوال تمرير النص من الأعلى للأسفل عبر الـ Refs عند تغيير مدخلات الأب (Tasks 24 & 25)
    function handleParentInputForFunc(text) {
        if (funcRef.current) {
            funcRef.current.updateText(text);
        }
    }

    function handleParentInputForClass(text) {
        if (classRef.current) {
            classRef.current.updateTextFromParent(text);
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.mainTitle}>Advanced Component Integration</Text>

            {/* قسم الكومبوننت الكلاس */}
            <View style={styles.section}>
                <Button title={showClass ? "Hide Class Page" : "Show Class Page"} onPress={toggleClassVisibility} />
                <Text style={styles.parentDisplay}>Text from Class Child: {classParentText}</Text>
                
                {/* مدخل نص في الأب يرسل للابن الكلاس عبر الـ Ref (Task 25) */}
                {showClass && (
                    <TextInput 
                        style={styles.parentInput} 
                        placeholder="Send to Class via Ref..." 
                        onChangeText={handleParentInputForClass}
                    />
                )}
                
                {showClass && (
                    <MyClassPage 
                        ref={classRef} 
                        onTextChange={setClassParentText} 
                    />
                )}
            </View>

            <View style={styles.divider} />

            {/* قسم الكومبوننت الفانكشن */}
            <View style={styles.section}>
                <Button title={showFunc ? "Hide Function Page" : "Show Function Page"} onPress={toggleFuncVisibility} />
                <Text style={styles.parentDisplay}>Text from Func Child: {funcParentText}</Text>
                
                {/* مدخل نص في الأب يرسل للابن الفانكشن عبر الـ Ref (Task 24) */}
                {showFunc && (
                    <TextInput 
                        style={styles.parentInput} 
                        placeholder="Send to Func via Ref..." 
                        onChangeText={handleParentInputForFunc}
                    />
                )}

                {showFunc && (
                    <MyFunctionPage 
                        ref={funcRef} 
                        onTextChange={setFuncParentText} 
                    />
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: '#fcfcfc' },
    mainTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#2c3e50' },
    section: { marginVertical: 10, padding: 15, backgroundColor: '#fff', borderRadius: 8, elevation: 2 },
    parentDisplay: { marginVertical: 8, fontSize: 15, fontWeight: '600', color: '#e67e22' },
    parentInput: { borderBottomWidth: 1, borderColor: '#bdc3c7', marginBottom: 10, padding: 5 },
    input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 8, marginVertical: 10, backgroundColor: '#fafafa' },
    childBoxClass: { marginTop: 15, padding: 15, backgroundColor: '#ebf5fb', borderRadius: 6, borderWidth: 1, borderColor: '#a9cce3' },
    childBoxFunc: { marginTop: 15, padding: 15, backgroundColor: '#eaf2f8', borderRadius: 6, borderWidth: 1, borderColor: '#a9dfbf' },
    childTitle: { fontSize: 14, fontWeight: 'bold', color: '#34495e' },
    resultText: { fontSize: 13, color: '#7f8c8d', marginTop: 5 },
    divider: { height: 2, backgroundColor: '#ecf0f1', my: 15 }
});

export default Task21;