const Answers = (props) => {
  const handleClick = () => {
    props.onClick(props.choiceId);
  };

  return (
    <button
      onClick={handleClick}
      className={`cursor-pointer select-none bg-red-500 text-xl text-white px-4 py-2 my-2 w-[60%] rounded hover:bg-red-400 transition duration-300 hover:scale-105`}
    >
      {props.title}
    </button>
  );
};

export default Answers;
