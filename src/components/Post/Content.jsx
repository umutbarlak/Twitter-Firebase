const Content = ({ tweet }) => {
  return (
    <div className="flex flex-col my-4 w-full">
      {tweet.textContent && <p>{tweet.textContent}</p>}
      {tweet.imageContent && (
        <img
          className="max-h-[400px] object-cover w-full rounded-lg my-2"
          src={tweet.imageContent}
        />
      )}
    </div>
  );
};

export default Content;
