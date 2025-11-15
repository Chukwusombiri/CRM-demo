import React, { useEffect, useState } from 'react'
import axiosClient, { isEmpty } from '../axios.client';
import DatalistLoading from '../components/DatalistLoading';
import H3 from '../components/H3';
import PrimaryButton from "../components/PrimaryButton";
import DangerButton from "../components/DangerButton";
import { useNavigate } from 'react-router-dom';
import usePaginationLinks from '../hooks/usePaginationLinks';

export default function Users({ }) {
  const navigate = useNavigate()
  const [respData, setRespData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const users = respData.data;
  const meta = respData.meta;
  const links = usePaginationLinks(meta);

  useEffect(() => {
    setIsLoading(true);
    axiosClient.get('/users')
      .then((resp) => {
        const { data } = resp;
        setIsLoading(false);
        setRespData(data);
      })
      .catch(err => {
        setIsLoading(false)
        console.error(err);
      })
  }, []);

  const handleUserDelete = async(id) => {
    if(!confirm("Are you certain you want to delete this user?")) return;

    try {
      setIsLoading(true);
      await axiosClient.delete(`/users/${id}`);
      const resp = await axiosClient.get('/users')
      const { data } = resp;
      setIsLoading(false);
      setRespData(data);
      window.dispatchEvent(new CustomEvent('notify',{
        detail: {
          type: 'error',
          message: 'Damn! You successfully deleted a user'
        }
      }))
    } catch (error) {
      setIsLoading(false);
      console.log(err);
    }    
  }

  async function handlePaginate(url){
      setIsLoading(true);
      try {
          const resp = await axiosClient.get(url);
          setRespData(resp.data);
          setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
  }

  if (isLoading) {
    return <DatalistLoading />
  }
  return (
    <div className='w-full'>
      <H3 content={'Users Management'} className='uppercase mb-6' />
      {
        isEmpty(respData)
          ? <div className='flex justify-center'>
            <p className="text-gray-600 font-semibold tracking-wide text-lg">Sorry! no records to display now.</p>
          </div>
          : <div>
            <div className="flex items-center gap-4">
              <PrimaryButton val={'add user'} type="button" onClick={(e) => {
                e.preventDefault();
                navigate('/users/new');
              }} />
              <p className="ml-auto text-sm text-gray-700">
                Showing {meta.from} to {meta.to} of {meta.total} records.
              </p>
            </div>
            <table className='min-w-full mt-8'>
              <thead>
                <tr className='w-full pb-2'>
                  <th className='px-4 text-gray-600 font-semibold text-xs uppercase text-start border-b border-gray-200 w-auto pb-2'>Name</th>
                  <th className='px-4 text-gray-600 font-semibold text-xs uppercase text-start border-b border-gray-200 w-auto pb-2'>Email</th>
                  <th className='px-4 text-gray-600 font-semibold text-xs uppercase text-start border-b border-gray-200 w-auto pb-2'>Actions</th>
                </tr>
              </thead>
              <tbody className=''>
                {
                  users.length > 0 && users.map(member => (
                    <tr key={member.id} className='w-full px-4 my-2 hover:bg-gray-100 '>
                      <td className='px-4 py-4 text-gray-700 text-sm text-start'>{member.name}</td>
                      <td className='px-4 py-4 text-gray-700 text-sm text-start'>{member.email}</td>
                      <td className='px-4 py-4 text-gray-700 text-sm text-start flex items-center gap-2'>
                        <PrimaryButton val={'edit'} onClick={() => navigate(`/users/${member.id}/edit`)} />
                        <DangerButton val={'delete'} onClick={evt => handleUserDelete(member.id)} />
                      </td>
                    </tr>
                  )
                  )
                }
              </tbody>
            </table>
            <div className="border-t border-gray-200 pt-4 flex items-center gap-4 flex-wrap">
              <p className="text-sm text-gray-600 mt-3">{`Page ${meta.current_page} out of ${meta.last_page} pages`}</p>
              <div className="mt-3 ml-auto flex justify-end items-center flex-nowrap">
                {
                  links.length > 0 && links.map((itm, idx) => (
                    <button
                      onClick={() => handlePaginate(itm.url)}
                      disabled={!itm.url}
                      key={idx}
                      dangerouslySetInnerHTML={{ __html: itm.label }}
                      className={`${meta.current_page == itm.label ? 'bg-gray-900' : 'bg-gray-700'}  disabled:bg-gray-500 text-gray-50 px-4 py-2 border-gray-50 first:rounded-l-lg last:rounded-r-lg ${idx !== 0 && idx !== links.length - 1 ? 'border-x' : ''}`}
                    />
                  ))
                }
              </div>
            </div>
          </div>
      }
    </div>
  )
}
