const form = document.getElementById("empForm");
const table = document.getElementById("empTable");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const role = document.getElementById("role").value;

  await fetch("/api/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, role })
  });

  loadEmployees();
  form.reset();
});

async function loadEmployees() {
  const res = await fetch("/api/employees");
  const data = await res.json();

  table.innerHTML = "";
  data.forEach(emp => {
    table.innerHTML += `
      <tr>
        <td>${emp.id}</td>
        <td>${emp.name}</td>
        <td>${emp.role}</td>
      </tr>
    `;
  });
}

loadEmployees();
