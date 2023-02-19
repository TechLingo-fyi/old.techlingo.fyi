import LingoDefinitions from "./LingoDefinitions";

const LingoDetail = ({ data, language }: { data: any; language: string }) => {
  return (
    <div className="flex items-start mt-9 justify-center h-screen">
      <div className="max-w-3xl min-w-3xl xl:min-w-max p-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-dark1 dark:border-gray-700">
        <h3 className="mb-2 text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
          {data.term}
        </h3>
        <LingoDefinitions data={data} language={language} />
      </div>
    </div>
  );
};

export default LingoDetail;
