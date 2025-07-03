import Link from "next/link";
import clients from "../projects/clients.json";

export default function Clients() {
  return (
    <ul className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4'>
      {clients.clients
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((client, index) => (
          <li key={index} className='text-md'>
            <Link
              href={client.url}
              target='_blank'
              rel='noopener noreferrer'
              className='hover:underline focus-visible:underline'
            >
              {client.name}
            </Link>
          </li>
        ))}
    </ul>
  );
}
