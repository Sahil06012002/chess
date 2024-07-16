export function Test() {
  const arr = [1, 2, 3, 4, 5];
    (
    <div>
      {
      arr.map((item,index) => {
        return <div key={index}>{item}</div>;
      })
      }
    </div>
  );
}
