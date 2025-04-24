// HTML 파일을 하나로 합치는 스크립트
const fs = require('fs');
const path = require('path');

// 합칠 파일 목록
const htmlFiles = [
    'index_header.html',
    'index_regulation.html',
    'index_overview.html',
    'index_problems_part1.html',
    'index_problems_part2.html',
    'index_problems_part3.html',
    'index_solutions_part1.html',
    'index_solutions_part2.html',
    'index_benefits.html',
    'index_conclusion.html'
];

// 모든 파일의 내용을 읽어서 하나로 합치기
let combinedContent = '';

htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    const content = fs.readFileSync(filePath, 'utf8');
    combinedContent += content;
});

// 결과 파일에 저장
fs.writeFileSync(path.join(__dirname, 'index.html'), combinedContent);

console.log('HTML 파일이 성공적으로 합쳐졌습니다.');
