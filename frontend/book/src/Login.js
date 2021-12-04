function Login() {
  function formFunction() {
    const form = document.querySelector("form");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      emailError.textContent = "";
      passwordError.textContent = "";

      const email = form.email.value;
      const password = form.password.value;

      try {
        const res = await fetch("/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        console.log(data);
        if (data.errors) {
          emailError.textContent = data.errors.email;
          passwordError.textContent = data.errors.password;
        }
        if (data.user) {
          location.assign("/");
        }
      } catch (err) {
        console.log(err);
      }
    });
  }

  return (
    <div>
      <form onSubmit={formFunction()}>
        <h2>Login</h2>
        <label for="email">Email</label>
        <input type="text" name="email" required />
        <div class="email error" />
        <label for="password">Password</label>
        <input type="password" name="password" required />
        <div class="password error" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
