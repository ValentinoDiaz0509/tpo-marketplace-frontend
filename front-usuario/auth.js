const API_URL = "http://localhost:4002/api/v1";

document.addEventListener("DOMContentLoaded", () => {
  // Registro
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        firstname: document.getElementById("firstname").value,
        lastname: document.getElementById("lastname").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      };
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      document.getElementById("registerMsg").textContent =
        res.ok ? "Usuario registrado con éxito." : "Error al registrar usuario.";
      if (res.ok && result.access_token) {
        localStorage.setItem("token", result.access_token);
        window.location.href = "profile.html";
      }
    });
  }

  // login
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = {
        email: document.getElementById("loginEmail").value,
        password: document.getElementById("loginPassword").value,
      };
      const res = await fetch(`${API_URL}/auth/authenticate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      document.getElementById("loginMsg").textContent =
        res.ok ? "Inicio de sesión exitoso." : "Credenciales inválidas.";
      if (res.ok && result.access_token) {
        localStorage.setItem("token", result.access_token);
        window.location.href = "profile.html";
      }
    });
  }

  // perfil
  const profilePage = document.getElementById("updateForm");
  if (profilePage) {
    getUserData();

    profilePage.addEventListener("submit", async (e) => {
      e.preventDefault();
      const token = localStorage.getItem("token");
      if (!token) return alert("No estás autenticado");

      const data = {
        email: document.getElementById("updateEmail").value,
        firstName: document.getElementById("updateFirstName").value,
        lastName: document.getElementById("updateLastName").value,
        password: document.getElementById("updatePassword").value,
      };

      const res = await fetch(`${API_URL}/users/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      document.getElementById("profileMsg").textContent = res.ok
        ? "Datos actualizados correctamente."
        : "Error al actualizar usuario.";
    });

    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.href = "login.html";
    });
  }
});

// verifico el token 
async function getUserData() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
    return;
  }
  try {
    const res = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const user = await res.json();
      document.getElementById("userData").innerHTML = `
        <p><b>Email:</b> ${user.email}</p>
        <p><b>Nombre:</b> ${user.firstName || "-"}</p>
        <p><b>Apellido:</b> ${user.lastName || "-"}</p>
        <p><b>Rol:</b> ${user.role}</p>
      `;
    } else {
      document.getElementById("userData").textContent = "Error al obtener usuario.";
    }
  } catch (err) {
    console.error(err);
  }
}

const forgotForm = document.getElementById("forgotForm");
if (forgotForm) {
  forgotForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("forgotEmail").value;
    const res = await fetch(`${API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    document.getElementById("forgotMsg").textContent = 
      res.ok ? "Correo de recuperación enviado." : "Error al enviar.";
  });
}
