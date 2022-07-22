type IfType =  {
  condition: boolean;
  children: any;
};

export default function If({
  condition,
  children,
}: IfType) {
  return condition ? children : null;
}
