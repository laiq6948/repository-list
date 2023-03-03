import { SEARCH_PER_PAGE, SEARCH_QUERY } from '../constants';
import { ResponseData } from '../entities';
import http from '../utils/http';

export const fetchRepositories = async (pageIndex?: number): Promise<ResponseData> => {
  const paras: string = `?q=${SEARCH_QUERY}&per_page=${SEARCH_PER_PAGE}${pageIndex ? `&page=${pageIndex}` : ''}`;
  return await http.get(`/search/repositories${paras}`);
};
