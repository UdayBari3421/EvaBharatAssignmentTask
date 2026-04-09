export function LoadingSpinner() {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <div
        style={{
          width: "40px",
          height: "40px",
          border: "4px solid var(--border)",
          borderTop: "4px solid var(--primary)",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          margin: "0 auto",
        }}
      />
      <p style={{ marginTop: "12px", color: "var(--text-secondary)" }}>Loading...</p>
    </div>
  );
}
