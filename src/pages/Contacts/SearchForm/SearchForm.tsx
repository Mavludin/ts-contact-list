import { Form } from 'antd';
import { Input } from 'antd';
import { useAppSelector } from '../../../store/hooks';
import { ContactItem } from '../../../store/slices/contact/contactApi';
import { selectContactList } from '../../../store/slices/contact/contactSlice';

import s from './SearchForm.module.css'

const { Search } = Input;

type Props = {
  setFiltered: (value: ContactItem[]) => void;
  setIsFiltering: (value: boolean) => void;
};

export const SearchForm = ({ setFiltered, setIsFiltering }: Props) => {
  const contactList = useAppSelector(selectContactList);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLocaleLowerCase();

    if (searchValue) {
      setIsFiltering(true);
      const filteredResult = contactList.filter((contact) => {
        return (
          contact.name.toLowerCase().includes(searchValue) ||
          contact.phone.toLowerCase().includes(searchValue)
        );
      });

      setFiltered(filteredResult);
    } else {
      setFiltered(contactList);
      setIsFiltering(false);
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
