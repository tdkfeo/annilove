const loveMessages = [
    "Anh yêu em vì nụ cười của em làm anh thấy bình yên.",
    "Hôm nay bé trông citi lắmmmm",
    "Em là giấc mơ mà anh không muốn tỉnh dậy.",
    "Cảm ơn em đã đến bên anh nheee💖",
    "Hôm nay nàng xinh đẹp tuyệt trần!",
    "Tôi yêu em như yêu một loài hoa <br> Có thể hái trong mơ và trong nhớ.<br>             -Tố Hữu-",
    "Bé yêu yêu đã ngủ chưa <br> Anh yêu yêu cũng mới vừa ngủ xong <br> Nến yêu yêu cháy trong phòng <br> Tình yêu yêu chảy trong lòng yêu yêu... <br>       -Nguyễn Nhật Ánh-",
    "Bé xao lính làm anh xao xuyến",
    "Yêu là chết ở trong lòng một ít <br> Vì mấy khi yêu mà chắc được yêu. <br> -Xuân Diệu-",
    "Chúc em một ngày dịu dàng như cánh hoa – và anh thì vẫn ở đây, làm ánh nắng.",
    "Chỉ cần em bình yên, ngày nào cũng là ngày đẹp trời với anh.",
    "Chúc bé 1 ngày tốt lành🍀🍀🍀🍀🍀",
    "Anh chẳng giỏi nói lời ngọt ngào, nên anh yêu em bằng cả ngày lặng im cũng nhớ.",
    "Nếu em là nắng, thì anh sẽ làm bầu trời để em ngự trị cả ngày."

];

const MAX_CLICKS_PER_DAY = 100; // Change this to your desired limit

// Shuffle function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function showHearts() {
    const container = document.getElementById('hearts-container');
    for (let i = 0; i < 12; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = (Math.random() * 90 + 5) + 'vw';
        heart.style.top = (Math.random() * 40 + 40) + 'vh';
        heart.style.color = ['#ff6f91', '#ffb6b9', '#fcdff0', '#f6abb6'][Math.floor(Math.random() * 4)];
        heart.innerHTML = '💖';
        heart.style.fontSize = (Math.random() * 16 + 16) + 'px';
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 1500);
    }
}

// Load or initialize message queue from localStorage
function getMessageQueue() {
    const today = getToday();
    const queueData = JSON.parse(localStorage.getItem('loveMsgQueue') || '{}');
    if (queueData.date !== today || !Array.isArray(queueData.queue) || queueData.queue.length === 0) {
        // New day or queue empty, reshuffle
        const newQueue = shuffle([...loveMessages]);
        localStorage.setItem('loveMsgQueue', JSON.stringify({ date: today, queue: newQueue }));
        return newQueue;
    }
    return queueData.queue;
}

function popMessageFromQueue() {
    const today = getToday();
    let queueData = JSON.parse(localStorage.getItem('loveMsgQueue') || '{}');
    let queue = queueData.queue || [];
    if (queueData.date !== today || !Array.isArray(queue) || queue.length === 0) {
        queue = shuffle([...loveMessages]);
    }
    const msg = queue.shift();
    localStorage.setItem('loveMsgQueue', JSON.stringify({ date: today, queue }));
    return msg;
}

function getToday() {
    const now = new Date();
    return now.toISOString().slice(0, 10); // Format: YYYY-MM-DD
}

function canClick() {
    const today = getToday();
    const data = JSON.parse(localStorage.getItem('loveMsgClicks') || '{}');
    if (data.date !== today) {
        // New day, reset count
        localStorage.setItem('loveMsgClicks', JSON.stringify({ date: today, count: 0 }));
        return true;
    }
    return data.count < MAX_CLICKS_PER_DAY;
}

function incrementClick() {
    const today = getToday();
    const data = JSON.parse(localStorage.getItem('loveMsgClicks') || '{}');
    const newCount = (data.date === today ? data.count : 0) + 1;
    localStorage.setItem('loveMsgClicks', JSON.stringify({ date: today, count: newCount }));
}
function showNewMessage() {
    if (!canClick()) {
        document.getElementById('message').textContent = "Bạn đã hết lượt cho hôm nay! Hãy quay lại vào ngày mai nhé 💖";
        return;
    }
    const msg = popMessageFromQueue();
    const msgDiv = document.getElementById('message');
    msgDiv.innerHTML = msg;   

    // Remove and re-add the fade-in class to trigger the animation
    msgDiv.classList.remove('fade-in');
    void msgDiv.offsetWidth; // Force reflow
    msgDiv.classList.add('fade-in');

    incrementClick();
    showHearts();
}

// After updating the message text
const msgDiv = document.getElementById('message');
msgDiv.textContent = msg;
msgDiv.classList.remove('fade-in'); // Reset animation
void msgDiv.offsetWidth; // Trigger reflow
msgDiv.classList.add('fade-in');

// Show the first message on load
window.onload = showNewMessage;
