// 메인 헤더 제목 클릭 기능
document.addEventListener('DOMContentLoaded', function() {
    const mainTitle = document.querySelector('.main-title');
    
    if (mainTitle) {
        mainTitle.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
