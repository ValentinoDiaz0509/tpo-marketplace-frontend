const token = localStorage.getItem("token");
if (!token) {
  alert("Acceso denegado. Iniciá sesión como administrador.");
  window.location.href = "../front-usuario/login.html";
}
