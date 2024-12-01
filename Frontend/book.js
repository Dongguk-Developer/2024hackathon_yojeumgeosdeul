document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('reserve-btn').addEventListener('click', makeReservation);
    document.getElementById('check-reservations-btn').addEventListener('click', showReservations);
});

let reservations = [];

function makeReservation() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const startDate = document.getElementById('start-date').value;
    const startTime = document.getElementById('start-time').value;
    const endDate = document.getElementById('end-date').value;
    const endTime = document.getElementById('end-time').value;

    if (!name || !phone || !startDate || !startTime || !endDate || !endTime) {
        alert('모든 정보를 입력해주세요');
        return;
    }

    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);

    if (startDateTime >= endDateTime) {
        alert('종료 날짜와 시간은 시작 날짜와 시간 이후여야 합니다');
        return;
    }

    const reservation = {
        id: new Date().getTime(),
        name,
        phone,
        startDate,
        startTime,
        endDate,
        endTime
    };
    reservations.push(reservation);
    alert('예약이 완료되었습니다');

    // 폼 초기화
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('start-date').value = '';
    document.getElementById('start-time').value = '';
    document.getElementById('end-date').value = '';
    document.getElementById('end-time').value = '';
}

function showReservations() {
    const reservationsListDiv = document.getElementById('reservations-list');
    reservationsListDiv.innerHTML = '';  // 기존 내용을 지우고 새로 표시

    if (reservations.length === 0) {
        reservationsListDiv.innerHTML = '<p>예약 내역이 없습니다.</p>';
        reservationsListDiv.style.display = 'block';
        return;
    }

    reservations.forEach((reservation) => {
        const reservationDiv = document.createElement('div');
        reservationDiv.classList.add('reservation');
        reservationDiv.innerHTML = `
            <p>예약자: ${reservation.name}</p>
            <p>전화번호: ${reservation.phone}</p>
            <p>시작 날짜: ${reservation.startDate}</p>
            <p>시작 시간: ${reservation.startTime}</p>
            <p>종료 날짜: ${reservation.endDate}</p>
            <p>종료 시간: ${reservation.endTime}</p>
            <button onclick="cancelReservation(${reservation.id})">예약 취소</button>
        `;
        reservationsListDiv.appendChild(reservationDiv);
    });

    reservationsListDiv.style.display = 'block'; // 예약 목록을 보이도록 설정
}

function cancelReservation(reservationId) {
    reservations = reservations.filter(reservation => reservation.id !== reservationId);
    alert('예약이 취소되었습니다');
    showReservations();  // 예약 취소 후 목록 업데이트
}