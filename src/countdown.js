function updateCountdown() {
  const eventDate = new Date("October 25, 2025 19:00:00 EST");
  const now = new Date();
  const diff = eventDate - now;

  if (diff <= 0) {
    document.getElementById("timer").innerHTML = "🎺 The show has begun!";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById("timer").innerHTML =
    `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();
