document.addEventListener('DOMContentLoaded', function() {
    // 탭 기능 구현
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // 초기화: 첫 번째 탭을 활성화
    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons[0].classList.add('active');
        document.getElementById(tabButtons[0].dataset.tab).classList.add('active');
    }

    // 탭 클릭 이벤트 처리
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 모든 탭 버튼에서 활성 클래스 제거
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // 모든 탭 콘텐츠에서 활성 클래스 제거
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // 클릭한 탭 버튼과 해당 콘텐츠에 활성 클래스 추가
            this.classList.add('active');
            const tabId = this.dataset.tab;
            document.getElementById(tabId).classList.add('active');
        });
    });

    // 스크롤 애니메이션 구현
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.main-nav a');

    // 스크롤 시 페이지 위치에 따라 네비게이션 하이라이트
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // 스무스 스크롤 구현
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    // 차트 애니메이션 및 수치 카운팅 효과
    const benefitCards = document.querySelectorAll('.benefit-card');
    
    // IntersectionObserver를 사용하여 요소가 화면에 표시될 때 애니메이션 시작
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 요소가 화면에 보이면 애니메이션 클래스 추가
                entry.target.classList.add('animate');
                
                // 숫자 카운팅 애니메이션 구현
                const metricValues = entry.target.querySelectorAll('.metric-value');
                metricValues.forEach(value => {
                    animateValue(value);
                });
                
                // 한 번 애니메이션을 실행한 후 관찰 중단
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    // 모든 benefit-card 요소를 관찰
    benefitCards.forEach(card => {
        observer.observe(card);
    });

    // 숫자 카운팅 애니메이션 함수
    function animateValue(element) {
        const value = element.textContent;
        // %나 +, 단위 등을 제거하고 숫자만 추출
        const numericValue = parseFloat(value.replace(/[^0-9.-]/g, ''));
        
        // 숫자가 아니면 애니메이션 실행하지 않음
        if (isNaN(numericValue)) return;
        
        // 애니메이션 시작값
        let startValue = 0;
        const duration = 1500; // 1.5초 동안 애니메이션
        const step = 30; // 애니메이션 스텝(ms)
        
        let current = startValue;
        const increment = (numericValue - startValue) / (duration / step);
        
        // 원래 값에서 숫자 부분과 나머지 부분 분리
        const prefix = value.match(/^[^0-9]*/)[0];
        const suffix = value.match(/[^0-9]*$/)[0];
        
        const timer = setInterval(() => {
            current += increment;
            
            // 목표값에 도달하거나 초과하면 타이머 중지
            if ((increment > 0 && current >= numericValue) || 
                (increment < 0 && current <= numericValue)) {
                clearInterval(timer);
                element.textContent = value; // 원래 값으로 복원
            } else {
                // 소수점 처리
                let displayValue;
                if (Number.isInteger(numericValue)) {
                    displayValue = Math.round(current);
                } else {
                    displayValue = current.toFixed(1);
                }
                element.textContent = prefix + displayValue + suffix;
            }
        }, step);
    }
    
    // 스크롤에 따른 요소 나타나기 애니메이션
    const fadeElements = document.querySelectorAll('.regulation-item, .system-components .component-card, .process-step, .improvement-card, .timeline-item, .key-point');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                }, 150);
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach((element, index) => {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        fadeObserver.observe(element);
    });
    
    // fade-in 클래스 스타일 추가
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
