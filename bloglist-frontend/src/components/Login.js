

const Login = ({handlePasswordChange, handleUserChange,handleLogin, username, password}) => {
    return(
      <div>
        <h2>Log in to application</h2>
    <form onSubmit={handleLogin}>
    <div>
      username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={handleUserChange}
      />
    </div>
    <div>
      password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={handlePasswordChange}
      />
    </div>
    <button type="submit">login</button>
  </form>  
  </div>
)
}
 
  
  export default Login