window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("orderForm");
  const result = document.getElementById("result");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // <--- Останавливаем перезагрузку

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const car = document.getElementById("car").value;
    const color = document.getElementById("color").value;
    const date = document.getElementById("date").value;

    result.innerHTML = `
      <h3 style="color: lightgreen;">✅ Замовлення успішне! Очікуйте підтвердження.</h3>
      <p><strong>Ім’я:</strong> ${name}</p>
      <p><strong>Телефон:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Модель:</strong> ${car}</p>
      <p><strong>Колір:</strong> <span style="color:${color}">${color}</span></p>
      <p><strong>Дата:</strong> ${date}</p>
    `;
  });
});
