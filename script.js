document.addEventListener('DOMContentLoaded', () => {
    // 1. Dữ liệu môn học và điểm số theo yêu cầu
    const tasks = [
        { name: "Toán (30 phút)", points: 15, id: "math" },
        { name: "Hóa (30 phút)", points: 15, id: "chemistry" },
        { name: "Sinh (30 phút)", points: 15, id: "biology" },
        { name: "Văn/Anh/Sử (30 phút)", points: 5, id: "social" }
    ];

    const tableBody = document.querySelector('#performance-table tbody');
    const totalScoreElement = document.getElementById('total-score');
    const feedbackElement = document.getElementById('feedback');
    const dayOfWeekElement = document.getElementById('day-of-week');

    // 2. Thiết lập ngày trong tuần
    const days = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
    const today = new Date();
    dayOfWeekElement.textContent = `Hôm nay là: ${days[today.getDay()]}`;

    // 3. Render danh sách môn học và checkbox
    function renderTasks() {
        tasks.forEach(task => {
            const row = tableBody.insertRow();
            
            // Cột 1: Tên môn học
            row.insertCell().textContent = task.name;
            
            // Cột 2: Checkbox
            const checkboxCell = row.insertCell();
            checkboxCell.className = 'checkbox-container';
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.dataset.points = task.points;
            checkbox.id = `task-${task.id}`;
            checkbox.addEventListener('change', updateScore);
            checkboxCell.appendChild(checkbox);

            // Cột 3: Điểm số
            row.insertCell().textContent = `${task.points} điểm`;
        });
    }

    // 4. Hàm tính và cập nhật điểm số
    function updateScore() {
        let currentScore = 0;
        const checkboxes = document.querySelectorAll('#performance-table input[type="checkbox"]');
        
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                currentScore += parseInt(checkbox.dataset.points);
            }
        });

        totalScoreElement.textContent = currentScore;
        updateFeedback(currentScore);
    }

    // 5. Hàm hiển thị Phản hồi theo yêu cầu (Gamification)
    function updateFeedback(score) {
        feedbackElement.className = 'feedback-message'; // Reset classes
        
        if (score >= 45) { // 50 điểm thì có pháo hoa (tôi lấy 45-50)
            feedbackElement.classList.add('feedback-success');
            feedbackElement.innerHTML = `<i class="fas fa-fireworks"></i> **XUẤT SẮC! TIẾN ĐỘ ĐẠT MỤC TIÊU VÀ VƯỢT KỲ VỌNG!** 🎆`;
            // Có thể thêm hiệu ứng pháo hoa bằng thư viện nếu cần phức tạp hơn
        } else if (score >= 35) {
            feedbackElement.classList.add('feedback-good');
            feedbackElement.innerHTML = `<i class="fas fa-check-circle"></i> **ĐẠT MỤC TIÊU. DUY TRÌ TỐC ĐỘ NÀY!**`;
        } else if (score > 0) { // 35 - 40 điểm (tôi lấy 35)
            feedbackElement.classList.add('feedback-retry');
            feedbackElement.innerHTML = `<i class="fas fa-exclamation-triangle"></i> **CỐ GẮNG LẦN SAU. TĂNG TỐC ĐỘ HOÀN THÀNH MỤC TIÊU CHÍNH!**`;
        } else {
            feedbackElement.innerHTML = `<i class="fas fa-medal"></i> Chờ Đánh Giá...`;
        }
    }

    // Khởi tạo ứng dụng
    renderTasks();
});