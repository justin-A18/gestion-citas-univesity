import { getDoctorsService } from '@/services/doctors.service';
import { authStore } from '@/store/authStore';
import { useQuery } from '@tanstack/react-query';

export const useDoctors = () => {
	const { token } = authStore((state) => state.initialState);

	const doctorQuery = useQuery({
		queryKey: ['doctors'],
		queryFn: () => getDoctorsService(token!),
	});

	return {
		doctorQuery,
	};
};
