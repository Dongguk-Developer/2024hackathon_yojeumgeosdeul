document.addEventListener('DOMContentLoaded', function () {
    const calendarElement = document.getElementById('calendar');
    const date = new Date();
    let currentMonth = date.getMonth();
    let currentYear = date.getFullYear();

    function renderCalendar() {
        calendarElement.innerHTML = '';
        const monthNames = [
            '1월', '2월', '3월', '4월', '5월', '6월',
            '7월', '8월', '9월', '10월', '11월', '12월'
        ];
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        const header = document.createElement('div');
        header.classList.add('calendar-header');
        header.innerHTML = `
            <button id="prevMonth">이전</button>
            <span>${monthNames[currentMonth]} ${currentYear}</span>
            <button id="nextMonth">다음</button>
        `;
        calendarElement.appendChild(header);

        const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
        const daysRow = document.createElement('div');
        daysRow.classList.add('calendar-days');
        daysOfWeek.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            dayElement.innerText = day;
            daysRow.appendChild(dayElement);
        });
        calendarElement.appendChild(daysRow);

        const datesGrid = document.createElement('div');
        datesGrid.classList.add('calendar-dates');
        
        for (let i = 0; i < firstDay; i++) {
            const emptySlot = document.createElement('div');
            emptySlot.classList.add('empty-slot');
            datesGrid.appendChild(emptySlot);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dateElement = document.createElement('div');
            dateElement.classList.add('calendar-date');
            dateElement.innerText = i;

            if (hasEvent(currentYear, currentMonth, i)) {
                dateElement.classList.add('event-date');
            }

            datesGrid.appendChild(dateElement);
        }

        calendarElement.appendChild(datesGrid);

        document.getElementById('prevMonth').addEventListener('click', function () {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar();
        });

        document.getElementById('nextMonth').addEventListener('click', function () {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar();
        });

        if (!document.getElementById('calendarPageButton')) {
            const calendarButton = document.createElement('button');
            calendarButton.id = 'calendarPageButton';
            calendarButton.innerText = '자세히 보기';
            calendarButton.style.display = 'block';
            calendarButton.style.margin = '10px auto';
            calendarButton.style.padding = '10px';
            calendarButton.style.backgroundColor = '#007bff';
            calendarButton.style.color = 'white';
            calendarButton.style.border = 'none';
            calendarButton.style.borderRadius = '4px';
            calendarButton.style.cursor = 'pointer';
            calendarButton.onclick = function () {
                window.location.href = 'calendar.html';
            };
            calendarElement.appendChild(calendarButton);
        }
    }

    function hasEvent(year, month, day) {
        const events = [
            { year: 2024, month: 11, day: 25 },
            { year: 2024, month: 11, day: 31 }
        ];
        return events.some(event => event.year === year && event.month === month && event.day === day);
    }

    window.renderCalendar = renderCalendar;

    renderCalendar();
});