// 고정 네비게이션 기능
document.addEventListener('DOMContentLoaded', function() {
    // 고정 네비게이션 생성
    const stickyNav = document.createElement('div');
    stickyNav.className = 'sticky-nav';
    
    const stickyNavContainer = document.createElement('div');
    stickyNavContainer.className = 'sticky-nav-container';
    
    // 제목 요소
    const stickyNavTitle = document.createElement('div');
    stickyNavTitle.className = 'sticky-nav-title';
    stickyNavTitle.textContent = '드론-로봇 하이브리드 배송 네트워크';
    stickyNavTitle.style.cursor = 'pointer';
    
    // 제목 클릭 시 메인으로 이동
    stickyNavTitle.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 링크 컨테이너
    const stickyNavLinks = document.createElement('div');
    stickyNavLinks.className = 'sticky-nav-links';
    
    // 네비게이션 링크 가져오기
    const mainNavLinks = document.querySelectorAll('.main-nav a');
    mainNavLinks.forEach(link => {
        const newLink = document.createElement('a');
        newLink.className = 'sticky-nav-link';
        newLink.href = link.getAttribute('href');
        newLink.textContent = link.textContent;
        
        // 페이지 내 네비게이션
        newLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            window.scrollTo({
                top: target.offsetTop - 60, // 네비게이션 바 높이만큼 조정
                behavior: 'smooth'
            });
        });
        
        stickyNavLinks.appendChild(newLink);
    });
    
    // 컨테이너에 요소들 추가
    stickyNavContainer.appendChild(stickyNavTitle);
    stickyNavContainer.appendChild(stickyNavLinks);
    stickyNav.appendChild(stickyNavContainer);
    
    // body에 네비게이션 추가
    document.body.insertBefore(stickyNav, document.body.firstChild);
    
    // 스크롤 이벤트 처리
    let lastScrollTop = 0;
    const scrollThreshold = 300; // 스크롤 임계값
    
    window.addEventListener('scroll', function() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 스크롤 방향 확인 및 임계값 이상 스크롤 됐는지 확인
        if (currentScrollTop > scrollThreshold) {
            stickyNav.classList.add('visible');
        } else {
            stickyNav.classList.remove('visible');
        }
        
        // 현재 활성화된 섹션 확인
        const sections = document.querySelectorAll('section');
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 70;
            const sectionHeight = section.offsetHeight;
            
            if (currentScrollTop >= sectionTop && currentScrollTop < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        // 해당 네비게이션 링크 활성화
        document.querySelectorAll('.sticky-nav-link').forEach(link => {
            link.classList.remove('active');
            
            const href = link.getAttribute('href').substring(1); // '#' 제거
            if (href === currentSectionId) {
                link.classList.add('active');
            }
        });
        
        lastScrollTop = currentScrollTop;
    });
});
