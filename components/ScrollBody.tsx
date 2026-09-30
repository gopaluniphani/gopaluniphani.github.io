export function ScrollBody({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-scroll" data-scroll-wrapper tabIndex={0} aria-label="Portfolio sections">
      <div className="page-scroll__content" data-scroll-content>
        {children}
      </div>
    </div>
  );
}
