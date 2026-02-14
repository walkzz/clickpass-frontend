import { useState } from 'react';
import '../styles/AccordionItem.css'

const AccordionItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`accordion-item ${isOpen ? 'active' : ''}`}>
            <button 
                className="accordion-header" 
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="question-text">{question}</span>
                <span className={`icon ${isOpen ? 'rotate' : ''}`}>
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.41 0.589996L6 5.17L10.59 0.589996L12 2L6 8L0 2L1.41 0.589996Z" fill="currentColor"/>
                    </svg>
                </span>
            </button>
            
            {isOpen && (
                <div className="accordion-body">
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};

export default AccordionItem;