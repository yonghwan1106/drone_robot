// 섹션 네비게이션 기능
document.addEventListener('DOMContentLoaded', function() {
    // 모든 섹션에 네비게이션 버튼 추가
    const sections = document.querySelectorAll('section');
    const sectionIds = Array.from(sections).map(section => section.id);
    
    sections.forEach((section, index) => {
        // 네비게이션 컨테이너 생성
        const navContainer = document.createElement('div');
        navContainer.className = 'section-nav';
        
        // 이전 섹션 버튼
        const prevBtn = document.createElement('button');
        prevBtn.className = 'section-nav-btn prev-section';
        prevBtn.innerHTML = '<i class="fas fa-arrow-left"></i> 이전 섹션';
        
        if (index === 0) {
            prevBtn.disabled = true;
        } else {
            prevBtn.addEventListener('click', function() {
                const prevSection = document.getElementById(sectionIds[index - 1]);
                window.scrollTo({
                    top: prevSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            });
        }
        
        // 홈으로 버튼
        const homeBtn = document.createElement('button');
        homeBtn.className = 'section-nav-btn section-nav-home';
        homeBtn.innerHTML = '<i class="fas fa-home"></i> 맨 위로';
        homeBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // 다음 섹션 버튼
        const nextBtn = document.createElement('button');
        nextBtn.className = 'section-nav-btn next-section';
        nextBtn.innerHTML = '다음 섹션 <i class="fas fa-arrow-right"></i>';
        
        if (index === sections.length - 1) {
            nextBtn.disabled = true;
        } else {
            nextBtn.addEventListener('click', function() {
                const nextSection = document.getElementById(sectionIds[index + 1]);
                window.scrollTo({
                    top: nextSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            });
        }
        
        // 버튼들을 네비게이션 컨테이너에 추가
        navContainer.appendChild(prevBtn);
        navContainer.appendChild(homeBtn);
        navContainer.appendChild(nextBtn);
        
        // 네비게이션 컨테이너를 섹션 끝에 추가
        section.appendChild(navContainer);
    });
});
