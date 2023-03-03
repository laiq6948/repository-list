import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SEARCH_COUNT_LIMIT, SEARCH_PER_PAGE, THROTTLE_TIME, WARNING_MESSAGE } from '../constants';
import { Repository } from '../entities';
import { fetchRepositories } from '../services/repository-service';
import './RepositoryList.css';

function RepositoryList() {
  const [repositories, setRepositories] = useState<Array<Repository>>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [throttling, setThrottling] = useState<boolean>(false);

  const handlePageClick = (clickEvent: {
    index: number | null;
    selected: number;
    nextSelectedPage: number | undefined;
    event: object;
    isPrevious: boolean;
    isNext: boolean;
    isBreak: boolean;
    isActive: boolean;
  }) => {
    if (throttling) {
      warning();
      return false;
    }
    setThrottling(true);
    setTimeout(() => setThrottling(false), THROTTLE_TIME);
    fetchRepositories(clickEvent.nextSelectedPage! + 1).then((result) => setRepositories(result.items));
  };

  const warning = () => toast.warn(WARNING_MESSAGE);

  useEffect(() => {
    fetchRepositories().then((result) => {
      // Calculate the page count only at first time.
      // Github's API only allows to fetch at most 1000 results.
      const count: number = Math.min(SEARCH_COUNT_LIMIT, result.total_count);
      setPageCount(Math.ceil(count / Number(SEARCH_PER_PAGE)));
      setRepositories(result.items);
    });
  }, []);

  return (
    <>
      <ToastContainer position="top-center" />
      <table className="RepositoryList" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>URL</th>
            <th>State</th>
            <th>Start Date</th>
          </tr>
        </thead>
        <tbody>
          {repositories.map((repository) => (
            <tr key={repository.id}>
              <td>{repository.id}</td>
              <td>{repository.name}</td>
              <td className="align-left">{repository.url}</td>
              <td>{repository.private ? 'private' : 'public'}</td>
              {/* We can also beautify the datetime format  */}
              <td>{repository.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Use well-known package and don't recreate the wheal */}
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onClick={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< Previous"
        containerClassName="pagination"
        pageLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        breakLinkClassName="page-link"
        activeLinkClassName="active"
      />
    </>
  );
}

export default RepositoryList;
