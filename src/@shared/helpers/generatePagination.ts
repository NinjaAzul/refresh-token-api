export const generatePagination = (_page: number, _take: number, _total: number) => {
  if (_page < 0 || _take < 0 || _total < 0) {
    throw new Error('Invalid pagination');
  }

  const skip = (_page - 1) * _take;
  const page = _page;
  const take = _take;
  const totalPages = Math.ceil(_total / _take);

  return {
    skip,
    page,
    take,
    totalPages,
  };
};
