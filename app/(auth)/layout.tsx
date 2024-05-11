const RootLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="h-full bg-slate-900 text-white">
            {children}
        </div>
    );
}
 
export default RootLayout;