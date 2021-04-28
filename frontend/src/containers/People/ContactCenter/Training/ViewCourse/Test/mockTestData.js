const sections = [
  {
    id: 0,
    title: 'About Us',
    sectionNum: 1,
    sectionIsActive: true,
    test: {
      title: 'Test',
      length: 0,
      questions: [
        {
          id: '0',
          questionType: 'multiple',
          questionText: 'Which of the following statement is valid to use a Node module http in a Node application?',
          options: [
            {
              id: '0',
              value: 'var http = require("http");',
            },
            {
              id: '1',
              value: 'var http = import("http");',
            },
            {
              id: '2',
              value: 'package http;',
            },
            {
              id: '3',
              value: 'import http;',
            },
          ],
          scale: {
            minValue: -50,
            maxValue: 50,
            correctValue: 0,
            minRange: -100,
            maxRange: 100,
          },
        },
        {
          id: '1',
          questionType: 'checkbox',
          questionText: 'q2?',
          options: [
            {
              id: '1619422170440.2388',
              value: '1',
            },
            {
              id: '1619422170440.0386',
              value: '2 correct',
            },
            {
              id: '1619422181799.803',
              value: '3 correct',
            },
          ],
          scale: {
            minValue: -50,
            maxValue: 50,
            correctValue: 0,
            minRange: -100,
            maxRange: 100,
          },
        },
        {
          id: '2',
          questionType: 'paragraph',
          questionText: 'para ques?',
          options: [
            {
              id: '1619422192751.7737',
              value: '',
            },
            {
              id: '1619422192751.5166',
              value: '',
            },
          ],
          scale: {
            minValue: -50,
            maxValue: 50,
            correctValue: 0,
            minRange: -100,
            maxRange: 100,
          },
        },
        {
          id: '3',
          questionType: 'text',
          questionText: 'textfield ques?',
          options: [
            {
              id: '1619422243065.6423',
              value: '',
            },
            {
              id: '1619422243065.5425',
              value: '',
            },
          ],
          scale: {
            minValue: -50,
            maxValue: 50,
            correctValue: 0,
            minRange: -100,
            maxRange: 100,
          },
        },
        {
          id: '4',
          questionType: 'scale',
          questionText: 'scale q?',
          options: [
            {
              id: '1619422255913.5632',
              value: '',
            },
            {
              id: '1619422255913.9067',
              value: '',
            },
          ],
          scale: {
            minValue: -56,
            maxValue: 100,
            correctValue: 5,
            minRange: -100,
            maxRange: 100,
          },
        },
        {
          id: '5',
          questionType: 'date',
          questionText: 'date q?',
          options: [
            {
              id: '1619422279726.8438',
              value: '',
            },
            {
              id: '1619422279726.3347',
              value: '',
            },
          ],
          scale: {
            minValue: -50,
            maxValue: 50,
            correctValue: 0,
            minRange: -100,
            maxRange: 100,
          },
        },
      ],
      isEmpty: false,
      isOpen: false,
    },
  },
  {
    id: '1',
    title: 'Introduction',
    sectionNum: '1',
    sectionIsActive: true,
    test: {
      title: 'Test',
      length: 0,
      questions: [
        {
          id: '6',
          questionType: 'multiple',
          questionText: 'section 2 question?',
          options: [
            {
              id: '1619504448177.1543',
              value: 'option a',
            },
            {
              id: '1619504448177.5715',
              value: 'option b',
            },
          ],
          scale: {
            minValue: -50,
            maxValue: 50,
            correctValue: 0,
            minRange: -100,
            maxRange: 100,
          },
        },
      ],
      isEmpty: false,
      isOpen: false,
    },
  },
  {
    id: '2',
    title: 'Getting Started',
    sectionNum: '2',
    sectionIsActive: true,
    test: {
      title: 'Test',
      length: 0,
      questions: [
        {
          id: '7',
          questionType: 'multiple',
          questionText: 'section 3 question 1?',
          options: [
            {
              id: '10',
              value: 'abc',
            },
            {
              id: '11',
              value: 'def',
            },
          ],
          scale: {
            minValue: -50,
            maxValue: 50,
            correctValue: 0,
            minRange: -100,
            maxRange: 100,
          },
        },
        {
          id: '8',
          questionType: 'paragraph',
          questionText: 'para ques?',
          options: [
            {
              id: '1619422192751.7737',
              value: '',
            },
            {
              id: '1619422192751.5166',
              value: '',
            },
          ],
          scale: {
            minValue: -50,
            maxValue: 50,
            correctValue: 0,
            minRange: -100,
            maxRange: 100,
          },
        },
      ],
      isEmpty: false,
      isOpen: false,
    },
  },
]

export default sections
