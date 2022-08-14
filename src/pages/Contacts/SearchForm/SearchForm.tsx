import { Form, Input } from 'antd';
import { useAppSelector } from '../../../store/hooks';
import { ContactItem } from '../../../store/slices/contact/contactApi';
import { selectContactList } from '../../../store/slices/contact/contactSlice';

import s from './SearchForm.module.css';

const { Search } = Input;

type Props = {
  setFilteredList: (value: ContactItem[] | null) => void;
};

export const SearchForm = ({ setFilteredList }: Props) => {
  const contactList = useAppSelector(selectContactList);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLocaleLowerCase();

    if (searchValue) {
      const filteredResult = contactList.filter((contact) => {
        return (
          contact.name.toLowerCase().includes(searchValue) ||
          contact.phone.toLowerCase().includes(searchValue)
        );
      });

      setFilteredList(filteredResult);
    } else {
      setFilteredList(null);
    }
  };

  return (
    <Form>
      <Search
        className={s.contactSearch}
        placeholder='Найти контакты'
        onChange={handleChange}
        enterButton
      />
    </Form>
  );
};
