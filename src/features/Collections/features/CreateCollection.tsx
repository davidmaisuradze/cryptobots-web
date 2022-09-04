import { useForm, SubmitHandler } from 'react-hook-form';
import { Image, ImageUpload } from '../../../components/UI';


type Inputs = {
  name: string;
  description: string;
  blockchain: string;
  featuredImage: string;
  bannerImage: string;
};

export const CreateCollection = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data, 'data');
  };

  // !!watch('featuredImage').length && console.log(watch('featuredImage')[0]);

  return (
    <div className="mt-4 w-1/2 m-auto">
      <h1 className="mb-4 text-2xl font-medium leading-6 text-gray-900">Create a Collection</h1>
      <div className="md:grid md:grid-cols-1 md:gap-6">
        <div className="mt-5 md:col-span-2 md:mt-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label htmlFor="collection-name" className="block text-sm font-medium text-gray-700">Name</label>
                    <div className="mt-1 rounded-md shadow-sm">
                      <input type="text" {...register('name', { required: true })} name="collection-name" id="collection-name" className="block w-full flex-1 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="My Collection"/>
                      {errors.name && <div className="text-red-400">This field is required</div>}
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                  <div className="mt-1">
                    <textarea {...register('description')} id="description" name="description" rows={10} className="mt-1 block w-3/4 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Description..."></textarea>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">Brief description for your profile. URLs are hyperlinked.</p>
                </div>

                <ImageUpload
                  title='Featured Image'
                  description='This image will be used for featuring your collection on the homepage or on category pages. 600 x 400 recommended.'
                  name='featuredImage'
                  fileUrl={watch('featuredImage')?.length && URL.createObjectURL(watch('featuredImage')[0] as any) || ''}
                  className="w-48 h-36"
                  register={register}
                />

                <ImageUpload
                  title='Banner Image'
                  description='This image will appear at the top of your collection page. Avoid including too much text in this banner image, as the dimensions change on different devices. 1400 x 350 recommended.'
                  name='bannerImage'
                  fileUrl={watch('bannerImage')?.length && URL.createObjectURL(watch('bannerImage')[0] as any) || ''}
                  className="w-96 h-32"
                  register={register}
                />
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

{/* <div className="mt-4 w-1/2 m-auto">
      <h1 className="mb-4 text-2xl font-medium leading-6 text-gray-900">Create a Collection</h1>
      <div className="md:grid md:grid-cols-1 md:gap-6">
        <div className="mt-5 md:col-span-2 md:mt-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="shadow sm:overflow-hidden sm:rounded-md">
              <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">Website</label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">http://</span>
                      <input type="text" name="company-website" id="company-website" className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="www.example.com"/>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="about" className="block text-sm font-medium text-gray-700">About</label>
                  <div className="mt-1">
                    <textarea id="about" name="about" rows={3} className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="you@example.com"></textarea>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">Brief description for your profile. URLs are hyperlinked.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Photo</label>
                  <div className="mt-1 flex items-center">
                    <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                      <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                    <button type="button" className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Change</button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Cover photo</label>
                  <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only"/>
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div> */}
