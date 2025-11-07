import Link from "next/link";

export function Header() {
  return (
    <div
      className={
        "flex flex-row justify-evenly border-black outline-double text-xl bg-amber-100 mb-2"
      }
    >
      <Link href={"/add"}>Add A Book</Link>
      <Link href={"/"}>Currently Reading</Link>
      <a className={""}>Want To Read</a>
      <a className={""}>Done Reading</a>
    </div>
  );
}
