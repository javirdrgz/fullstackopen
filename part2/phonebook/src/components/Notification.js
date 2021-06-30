const Notification = ({ notification }) => {
  if (notification !== null) {
    const { message, type } = notification;
    return <p className={type}>{message}</p>;
  }
  return null;
};

export default Notification;
