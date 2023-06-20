
function Layout(props: any) {
  return (
    <div
      style={{ width: "100%", height: "100%" }}
    >
      {props.children}
    </div>
  );
}

export default Layout;
