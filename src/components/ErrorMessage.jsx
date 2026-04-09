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
      ⚠️ {message}
    </div>
  );
}
