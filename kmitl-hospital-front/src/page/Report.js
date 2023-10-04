import ReportList from "../component/ReportList";

function Report() {

  return (
    <div className='flex flex-col min-h-screen h-auto py-20'>
      <div className="border-l-8 border-orange-600 pl-1.5 ml-10 xl:ml-40">
        <h1 className="font-semibold text-4xl">ค้นหาการนัดหมาย</h1>
        <button onClick={() => window.scrollTo(0, document.body.scrollHeight)}>goDown</button>
      </div>
      <ReportList/>
      <button onClick={() => window.scrollTo(0, 0)}>goTop</button>
    </div>
    
  );
}

export default Report;
