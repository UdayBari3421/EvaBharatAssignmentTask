import warningIcon from "../icons/warning.svg";

export function ErrorMessage({ message }) {
  return (
    <div
      style={{
        background: "#ffeef0",
        border: "1px solid #d73a49",
        color: "#d73a49",
        padding: "12px 16px",
        borderRadius: "var(--radius)",
        marginBottom: "16px",
      }}>
      <img
        src={warningIcon}
        style={{
          width: "16px",
          height: "16px",
          marginRight: "8px",
        }}
        alt="Warning"
      />
      {message}
    </div>
  );
}
