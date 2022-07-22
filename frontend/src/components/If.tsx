export default function If({
  condition,
  children,
}: {
  condition: boolean;
  children: any;
}) {
  return condition ? children : null;
}
