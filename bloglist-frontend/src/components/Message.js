const Message =  ({message, kind}) => (
    <div className={kind}>
    <p>{message}</p>
    </div>
  )

  export default Message