// script.js

// Lắng nghe sự kiện "DOMContentLoaded" để đảm bảo rằng tất cả các phần tử HTML đã được tải trước khi thao tác trên chúng
document.addEventListener("DOMContentLoaded", function() {
    // Lấy tham chiếu đến form và ô input
    const weatherForm = document.getElementById('weather-form');
    const addressInput = document.getElementById('address');
    const weatherInfo = document.getElementById('weather-info');
    
    weatherForm.addEventListener("submit", function(event) {
        console.log("PRESS");
        event.preventDefault();
        
        const address = addressInput.value;
        
        fetch(`/weather/?address=${address}`)
            .then(response => response.json()) // Chuyển đổi dữ liệu nhận được sang JSON
            .then(data => {
                if (data.error) {
                    weatherInfo.textContent = data.error;
                } else {
                    console.log(data);
                    weatherInfo.innerHTML = `
                        <p>Location: ${data.name}</p>
                        <p>Temperature: ${data.main.temp}</p>
                        <p>Sunset Time: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
                    `;
                }
            })
            .catch(error => {
                console.error(error);
                weatherInfo.textContent = 'An error occurred. Please try again later.';
            });
    });
});
