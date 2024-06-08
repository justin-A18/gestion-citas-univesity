import { Link } from 'react-router-dom';
import { TypographyH1, TypographyH2 } from '../typography';

export const SidebarDashBoard = () => {
	return (
		<aside className='p-4 flex flex-col gap-4'>
			<header className='h-12'>
				<TypographyH1 className='text-[#252136] text-2xl flex items-center uppercase'>
					<span>Salu</span>
					<img
						className='size-7'
						src='/logo.svg'
						alt='logo'
					/>
					<span>Vital</span>
				</TypographyH1>
			</header>

			<div>
				<TypographyH2 className='text-lg text-[#252136] font-medium flex items-center gap-2'>
					<i className='bx bxs-notepad bx-sm'></i> Citas
				</TypographyH2>

				<ul className='flex flex-col py-2'>
					<li className='py-3 hover:bg-gray-200 rounded-md'>
						<Link
							to='/dashboard'
							className='p-3'>
							Listar Citas
						</Link>
					</li>
					<li className='py-3 hover:bg-gray-200  rounded-md'>
						<Link
							to='/dashboard/cite/create'
							className='p-3'>
							Crear Citas
						</Link>
					</li>
				</ul>
			</div>

			<div>
				<TypographyH2 className='text-lg text-[#252136] font-medium flex items-center gap-2'>
					<i className='bx bx-plus-medical'></i>Doctores
				</TypographyH2>

				<ul className='flex flex-col py-2'>
					<li className='py-3 hover:bg-gray-200 rounded-md'>
						<Link
							to='/dashboard/doctors'
							className='p-3'>
							Listar Doctores
						</Link>
					</li>
				</ul>
			</div>
		</aside>
	);
};
