"use client";



export default function Profile() {
  const arr = [{title: "test"}, {title: "test2"}, {title: "test3"}]
    return (
      <div className="flex flex-col justify-center items-center h-full p-5">
        Profile
            {arr.map((item, i) => ( // Destructure 'title' directly
                <span key={i}>
                    here
                    {item.title}
                </span>
            ))}
      </div>
    );
  }
  